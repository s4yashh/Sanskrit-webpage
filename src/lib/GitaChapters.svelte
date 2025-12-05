<script lang="ts">
  import { onMount } from 'svelte';

  interface Chapter {
    id: number;
    title: string;
    description: string;
    verseCount: number;
  }

  interface Verse {
    chapter: number;
    verse: number;
    text: string;
    transliteration: string;
    meaning: string;
  }

  const chapters: Chapter[] = [
    { id: 1, title: 'Chapter 1', description: 'Arjuna Vishada Yoga', verseCount: 47 },
    { id: 2, title: 'Chapter 2', description: 'Sankhya Yoga', verseCount: 72 },
    { id: 3, title: 'Chapter 3', description: 'Karma Yoga', verseCount: 43 },
    { id: 4, title: 'Chapter 4', description: 'Jnana Yoga', verseCount: 42 },
    { id: 5, title: 'Chapter 5', description: 'Sannyasa Yoga', verseCount: 29 },
    { id: 6, title: 'Chapter 6', description: 'Dhyana Yoga', verseCount: 47 },
    { id: 7, title: 'Chapter 7', description: 'Jnana Vijnana Yoga', verseCount: 30 },
    { id: 8, title: 'Chapter 8', description: 'Aksara Brahma Yoga', verseCount: 28 },
    { id: 9, title: 'Chapter 9', description: 'Raja Vidya Yoga', verseCount: 34 },
    { id: 10, title: 'Chapter 10', description: 'Vibhuti Yoga', verseCount: 42 },
    { id: 11, title: 'Chapter 11', description: 'Visvarupa Darsana Yoga', verseCount: 55 },
    { id: 12, title: 'Chapter 12', description: 'Bhakti Yoga', verseCount: 20 },
    { id: 13, title: 'Chapter 13', description: 'Kshetra Kshetrajna Yoga', verseCount: 35 },
    { id: 14, title: 'Chapter 14', description: 'Gunatraya Vibhaga Yoga', verseCount: 27 },
    { id: 15, title: 'Chapter 15', description: 'Purushottama Yoga', verseCount: 20 },
    { id: 16, title: 'Chapter 16', description: 'Daivasura Sampad Yoga', verseCount: 24 },
    { id: 17, title: 'Chapter 17', description: 'Shraddhatraya Vibhaga Yoga', verseCount: 28 },
    { id: 18, title: 'Chapter 18', description: 'Moksha Sannyasa Yoga', verseCount: 78 },
  ];

  let hoveredChapter: number | null = null;
  let selectedChapter: number | null = null;
  let verses: any[] = [];
  let isLoading = false;
  let error: string | null = null;
  let selectedVerse: any | null = null; // Currently selected verse for modal
  let showWholeChapter = false; // Flag for whole chapter modal
  let wholeChapterIntro: string = ''; // Chapter introduction text
  let versesCache: Map<number, any[]> = new Map(); // Cache for preloaded verses
  let introCache: Map<number, string> = new Map(); // Cache for chapter introductions

  /**
   * Handle back button to return to chapter grid
   */
  function handleBackClick() {
    selectedChapter = null;
    verses = [];
    selectedVerse = null;
    showWholeChapter = false;
  }

  /**
   * Open verse modal
   */
  function openVerseModal(verse: any) {
    selectedVerse = verse;
    showWholeChapter = false;
  }

  /**
   * Fetch chapter introduction from first verse
   * Extract only the intro part (before footnotes) from verse 0
   */
  async function fetchChapterIntro(chapterNumber: number) {
    // Check cache first
    if (introCache.has(chapterNumber)) {
      wholeChapterIntro = introCache.get(chapterNumber) || '';
      return;
    }

    try {
      const response = await fetch(`/api/gita?q=${chapterNumber}`);
      if (!response.ok) throw new Error('Failed to fetch intro');
      
      const json = await response.json();
      let fetchedVerses = json.data || json.verses || json;
      
      if (Array.isArray(fetchedVerses) && fetchedVerses.length > 0) {
        // Get the first verse which contains chapter intro
        const firstVerse = fetchedVerses[0];
        let introText = firstVerse.lyrics || '';
        
        // Extract only the intro part (before the first footnote [1])
        // The footnotes start with [1], [2], etc.
        const footnoteMatch = introText.match(/\[\d+\]/);
        if (footnoteMatch) {
          // Get content before the footnote
          const beforeFootnote = introText.substring(0, footnoteMatch.index);
          // Add the footnotes back (everything from first footnote onwards)
          const footnotesStart = introText.substring(footnoteMatch.index);
          introText = beforeFootnote + '\n\n' + footnotesStart;
        }
        
        wholeChapterIntro = introText;
        introCache.set(chapterNumber, introText);
      }
    } catch (err) {
      console.error('Error fetching intro:', err);
      wholeChapterIntro = '';
    }
  }

  /**
   * Open whole chapter modal
   */
  async function openWholeChapterModal() {
    showWholeChapter = true;
    selectedVerse = null;
    if (selectedChapter) {
      await fetchChapterIntro(selectedChapter);
    }
  }

  /**
   * Close all modals
   */
  function closeModal() {
    selectedVerse = null;
    showWholeChapter = false;
  }

  /**
   * Normalize API response into a consistent array format
   * Handles multiple response structures that the API might return
   */
  function normalizeApiResponse(json: any): any[] {
    if (!json) return [];

    // CASE 1: Pure array response
    if (Array.isArray(json)) return json;

    // CASE 2: { data: [...] }
    if (Array.isArray(json.data)) return json.data;

    // CASE 3: { verses: [...] }
    if (Array.isArray(json.verses)) return json.verses;

    // CASE 4: No valid array found
    return [];
  }

  /**
   * Fetch verses for a specific chapter from the API
   * Uses Vercel serverless API proxy to bypass CORS restrictions
   * @param chapterNumber - The chapter to fetch
   * @param background - If true, this is a background preload (won't update UI if another chapter is selected)
   */
  async function fetchVerses(chapterNumber: number, background = false) {
    // Get the expected verse count for this chapter
    const currentChapter = chapters.find(ch => ch.id === chapterNumber);
    const expectedCount = currentChapter?.verseCount || 0;

    isLoading = true;
    error = null;

    try {
      // Use Vercel API proxy endpoint (/api/gita)
      const response = await fetch(`/api/gita?q=${chapterNumber}`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      // Try parsing as JSON first
      let json;
      try {
        json = await response.json();
      } catch {
        // If JSON parsing fails, try parsing as text then JSON
        const text = await response.text();
        json = JSON.parse(text);
      }

      // STEP 1: Normalize API response to clean array
      let fetchedVerses = normalizeApiResponse(json);
      console.log('Normalized verses:', fetchedVerses.length);

      // STEP 2: Remove verse 0 (introduction verse, not numbered)
      fetchedVerses = fetchedVerses.filter((v: any) => v.shlok_no > 0);
      console.log('After filtering verse 0:', fetchedVerses.length);

      // STEP 3: Enforce expected count (remove any extra verses)
      fetchedVerses = fetchedVerses.slice(0, expectedCount);
      console.log('After enforcing count:', fetchedVerses.length, 'Expected:', expectedCount);

      // GUARD: Ignore stale background responses
      if (background && selectedChapter !== chapterNumber) {
        console.log('Stale background response ignored for chapter', chapterNumber);
        return;
      }

      // Store in cache and update display
      versesCache.set(chapterNumber, fetchedVerses);
      verses = fetchedVerses;

      if (verses.length === 0) {
        error = 'No verses found for this chapter';
      }
    } catch (err) {
      error = `Failed to load verses: ${err instanceof Error ? err.message : 'Unknown error'}`;
      console.error('Error fetching verses:', err);
    } finally {
      isLoading = false;
    }
  }

  /**
   * Handle chapter selection and fetch verses
   */
  function handleChapterClick(chapterId: number) {
    selectedChapter = chapterId;
    // Don't show loading state, fetch verses in background
    fetchVerses(chapterId);
  }

  onMount(() => {
    // Clear old caches to ensure no stale data
    versesCache.clear();
    introCache.clear();
    
    // Preload Chapter 1 immediately for smooth initial load
    fetchVerses(1, false).then(() => {
      // Preload other chapters in background (they won't overwrite UI)
      for (let i = 2; i <= 18; i++) {
        fetchVerses(i, true);
      }
    });
    selectedChapter = null;
  });
</script>

<section class="chapters-section">
  <div class="book-image-container">
    <img src="/images/gita_open.png" alt="Open Gita Book" class="book-image" />
  </div>
  <h2 class="section-title">
    {#if selectedChapter === null}
      GITA CHAPTERS
    {:else}
      CHAPTER {selectedChapter}
    {/if}
  </h2>
  <div class="title-divider"></div>
  
  {#if selectedChapter === null}
    <!-- Show Chapter Grid -->
    <div class="chapters-grid">
      {#each chapters as chapter (chapter.id)}
        <div
          class="chapter-card"
          on:mouseenter={() => (hoveredChapter = chapter.id)}
          on:mouseleave={() => (hoveredChapter = null)}
          on:click={() => handleChapterClick(chapter.id)}
          role="button"
          tabindex="0"
          on:keydown={(e) => {
            if (e.key === 'Enter') {
              handleChapterClick(chapter.id);
            }
          }}
        >
          <div class="chapter-card-inner">
            <div class="chapter-image-wrapper">
              <img src="/images/gita_book.jpg" alt={`Chapter ${chapter.id}`} class="chapter-image" />
              <div class="chapter-number">{chapter.id}</div>
            </div>
          </div>
          {#if hoveredChapter === chapter.id}
            <div class="chapter-tooltip">
              <h3>{chapter.title}</h3>
              <p>{chapter.description}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <!-- Show Verses Grid -->
    <div class="verses-header">
      <button class="back-btn" on:click={handleBackClick}>&lt; Back</button>
    </div>
    
    {#if isLoading}
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Loading verses...</p>
      </div>
    {:else if error}
      <div class="error-state">
        <p>{error}</p>
        <button on:click={() => handleChapterClick(selectedChapter)}>Try Again</button>
      </div>
    {:else if verses.length > 0}
      <div class="chapter-content">
        <div class="verses-grid">
          <!-- Whole Chapter Card -->
          <div class="verse-scroll-card" on:click={openWholeChapterModal}>
            <img src="/images/sletter.png" alt="Whole Chapter" class="verse-scroll-bg" />
            <div class="verse-scroll-content">
              <div class="whole-chapter-text">Whole<br/>Chapter</div>
              <button class="verse-play-btn" title="Show chapter content" on:click|stopPropagation={openWholeChapterModal}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Individual Verse Cards -->
          {#each verses as verse, index (verse.geeta_id || index)}
            <div class="verse-scroll-card" on:click={() => openVerseModal(verse)}>
              <img src="/images/sletter.png" alt={`Verse ${verse.shlok_no}`} class="verse-scroll-bg" />
              <div class="verse-scroll-content">
                <div class="verse-number">{verse.shlok_no || index + 1}</div>
                <button class="verse-play-btn" title="Show verse content" on:click|stopPropagation={() => openVerseModal(verse)}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          {/each}

          <!-- End of Chapter Card -->
          <div class="verse-scroll-card">
            <img src="/images/sletter.png" alt="End of Chapter" class="verse-scroll-bg" />
            <div class="verse-scroll-content">
              <div class="whole-chapter-text">End of<br/>Chapter</div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/if}
</section>

<!-- Modals rendered outside the main section -->
{#if showWholeChapter}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal-container whole-chapter-modal" on:click|stopPropagation>
      <button class="modal-close-btn" on:click={closeModal}>✕</button>
      <div class="modal-content">
        <div class="whole-chapter-content">
          {#if wholeChapterIntro}
            <div class="chapter-intro">
              {@html wholeChapterIntro}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

{#if selectedVerse}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal-container verse-modal" on:click|stopPropagation>
      <button class="modal-close-btn" on:click={closeModal}>✕</button>
      <div class="modal-content">
        {#if selectedVerse.lyrics}
          <div class="verse-lyrics">
            {@html selectedVerse.lyrics}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400;600&display=swap');

  @font-face {
    font-family: 'Lato';
    src: url('/src/assets/Bangers,Inter,Lato,Lexend_Deca,Montserrat,etc/Lato/Lato-Regular.ttf') format('truetype');
  }

  .chapters-section {
    background: linear-gradient(135deg, #F3EAC1 0%, #E9DCB7 50%, #F0EDD7 100%);
    padding: 40px 40px 80px 40px;
    text-align: center;
  }

  .book-image-container {
    margin-bottom: -10px;
    display: flex;
    justify-content: center;
  }

  .book-image {
    height: 200px;
    width: auto;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    margin-top: -155px;
  }

  .section-title {
    font-size: 22px;
    font-weight: 350;
    color: #BD003C;
    letter-spacing: 2px;
    margin: 10px 0 0px 0;
    text-transform: uppercase;
    display: inline-block;
    font-family: 'Lato', sans-serif;
  }

  .title-divider {
    height: 2px;
    width: 270px;
    background-color: #c41e3a;
    margin: 0 auto 90px auto;
  }

  .chapters-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 90px;
    max-width: 1200px;
    margin: 0 0 0 80px;
    padding: 0 20px;
  }

  .chapter-card {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 140px;
    transition: opacity 0.3s ease;
  }

  .chapter-card.active {
    opacity: 1;
  }

  .chapter-card.active .chapter-card-inner {
    transform: scale(1.1);
  }

  .chapter-card-inner {
    position: relative;
    width: 130px;
    height: 130px;
    transition: transform 0.3s ease;
  }

  .chapter-card:hover .chapter-card-inner {
    transform: scale(1.05);
  }

  .chapter-image-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid #928B8C;
  }

  .chapter-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: rotate(-45deg) scale(1.2);
    transform-origin: center;
  }

  .chapter-number {
    position: absolute;
    background-color: #352c2cad;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 0;
    transform: translateY(-50%) rotate(-45deg);
    font-size: 22px;
    font-weight: 100;
    color: white;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    z-index: 10;
  }

  .chapter-tooltip {
    position: absolute;
    bottom: -120px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 16px;
    border-radius: 4px;
    width: 180px;
    text-align: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 20;
  }

  .chapter-card:hover .chapter-tooltip {
    opacity: 1;
  }

  .chapter-tooltip h3 {
    font-size: 14px;
    margin: 0 0 8px 0;
    font-weight: 600;
    font-family: 'Lato', sans-serif;
  }

  .chapter-tooltip p {
    font-size: 12px;
    margin: 0;
    color: #ccc;
    font-family: 'Lato', sans-serif;
  }

  /* Verses Section Styles */
  .verses-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 60px;
    position: relative;
  }

  .back-btn {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #BD003C;
    text-decoration: underline;
    font-size: 16px;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    transition: color 0.3s ease;
    padding: 0;
  }

  .back-btn:hover {
    color: #9a0030;
  }

  .verses-title {
    font-size: 28px;
    font-weight: 600;
    color: #BD003C;
    margin: 0;
    font-family: 'Lato', sans-serif;
    text-align: center;
    text-decoration: underline;
  }

  .verses-subtitle {
    display: block;
    font-size: 16px;
    font-weight: 400;
    color: #BD003C;
    margin-top: 8px;
    font-style: italic;
    font-family: 'Lato', sans-serif;
  }

  /* Chapter Content Styles */
  .chapter-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .chapter-label {
    font-size: 20px;
    font-weight: 400;
    color: #BD003C;
    text-transform: lowercase;
    font-family: 'Lato', sans-serif;
    margin-bottom: 40px;
    letter-spacing: 1px;
  }

  .chapter-label.end-label {
    margin-top: 60px;
    margin-bottom: 0;
    text-align: center;
  }

  .verses-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 90px;
    margin-top: 60px;
    max-width: 100%;
    padding: 0 40px;
  }

  .verse-scroll-card {
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  .verse-scroll-card:hover {
    transform: scale(1.05);
  }

  .verse-scroll-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .verse-scroll-content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    height: 100%;
    width: 100%;
  }

  .verse-number {
    font-size: 48px;
    font-weight: 300;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    font-family: 'Lato', sans-serif;
  }

  .whole-chapter-text {
    font-size: 32px;
    font-weight: 300;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    font-family: 'Lato', sans-serif;
    text-align: center;
    line-height: 1.4;
  }

  .verse-play-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: 3px solid white;
    color: #BD003C;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .verse-play-btn:hover {
    background: white;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .verse-play-btn svg {
    width: 24px;
    height: 24px;
    margin-left: 4px;
  }

  /* Whole Chapter Content */
  .whole-chapter-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    text-align: justify;
  }

  .chapter-verse-text {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 15px;
    line-height: 1.9;
    font-family: 'Lato', sans-serif;
  }

  /* Modal Styles */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }

  .modal-container {
    background: #F0E8D8;
    border-radius: 20px;
    padding: 50px 60px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .whole-chapter-modal {
    width: 95%;
    max-width: 1100px;
    background: #FAD4B3;
  }

  .verse-modal {
    width: 85%;
    max-width: 800px;
    background: #FAD4B3;
  }

  .modal-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    color: #333;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2001;
    transition: background 0.2s ease;
  }

  .modal-close-btn:hover {
    background: rgba(189, 0, 60, 0.1);
  }

  .modal-content {
    position: relative;
  }

  .verse-modal .modal-content {
    max-height: 70vh;
    overflow-y: auto;
    padding: 20px 10px;
  }

  .verse-text-display {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .verse-lyrics {
    font-family: 'Lato', sans-serif;
    color: #333;
    line-height: 1.8;
    text-align: center;
  }

  .verse-lyrics :global(p) {
    margin: 15px 0;
    font-size: 15px;
    text-align: center;
  }

  .verse-lyrics :global(strong) {
    font-weight: 600;
  }

  .verse-lyrics :global(span.text-huge) {
    font-size: 24px !important;
    display: block;
    margin: 10px 0;
  }

  .whole-chapter-content {
    max-height: 70vh;
    overflow-y: auto;
    padding: 20px 10px;
  }

  .chapter-intro {
    font-family: 'Lato', sans-serif;
    color: #333;
    font-size: 15px;
    line-height: 1.8;
  }

  .chapter-intro :global(p) {
    margin: 15px 0;
  }

  .chapter-intro :global(strong) {
    font-weight: 600;
  }

  .chapter-intro :global(span.text-huge) {
    font-size: 24px !important;
    display: block;
    margin: 15px 0 10px 0;
    font-weight: 600;
  }

  .whole-chapter-verse {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    line-height: 1.8;
  }

  .verse-ref {
    font-weight: 600;
    color: #BD003C;
    flex-shrink: 0;
    min-width: 30px;
  }

  .verse-lyrics-whole {
    font-family: 'Lato', sans-serif;
    color: #333;
    font-size: 15px;
    flex: 1;
  }

  .verse-lyrics-whole :global(p) {
    margin: 0;
    display: inline;
  }

  .verse-lyrics-whole :global(span.text-huge) {
    font-size: 24px !important;
    display: block;
    margin: 15px 0 10px 0;
    font-weight: 600;
  }

  .sanskrit-text {
    font-size: 20px;
    line-height: 1.8;
    margin: 0;
    font-family: 'Lato', sans-serif;
    color: #BD003C;
    font-weight: 500;
  }

  .transliteration-text {
    font-size: 18px;
    line-height: 1.8;
    margin: 0;
    font-family: 'Lato', sans-serif;
    font-style: italic;
    color: #4A90E2;
  }

  .meaning-text {
    font-size: 16px;
    line-height: 1.9;
    margin: 0;
    font-family: 'Lato', sans-serif;
    color: #333;
    text-align: justify;
  }

  .debug-verse {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .debug-property {
    text-align: left;
  }

  .debug-property strong {
    font-size: 14px;
    color: #BD003C;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
  }

  .debug-property p {
    font-size: 15px;
    line-height: 1.8;
    margin: 10px 0 0 0;
    color: #333;
    font-family: 'Lato', sans-serif;
  }

  .chapter-header-content {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #D4AF37;
  }

  .chapter-number-roman {
    font-size: 56px;
    font-weight: 400;
    color: #333;
    margin: 0 0 15px 0;
    font-family: 'Lato', sans-serif;
    letter-spacing: 2px;
  }

  .chapter-description {
    font-size: 20px;
    font-weight: 400;
    color: #333;
    margin: 0;
    font-family: 'Lato', sans-serif;
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    color: #666;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f0f0f0;
    border-top: 4px solid #BD003C;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-state p {
    font-size: 16px;
    margin: 0;
    font-family: 'Lato', sans-serif;
  }

  .error-state {
    background: #fff3cd;
    border: 1px solid #ffc107;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    margin: 20px 0;
  }

  .error-state p {
    color: #856404;
    margin: 0 0 15px 0;
    font-family: 'Lato', sans-serif;
  }

  .error-state button {
    background: #BD003C;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    transition: background 0.3s ease;
  }

  .error-state button:hover {
    background: #9a0030;
  }

  @media (max-width: 768px) {
    .chapters-section {
      padding: 60px 20px;
    }

    .section-title {
      font-size: 22px;
      margin-bottom: 40px;
    }

    .chapters-grid {
      gap: 30px;
    }

    .chapter-card {
      height: 140px;
    }

    .chapter-card-inner {
      width: 130px;
      height: 130px;
    }

    .chapter-number {
      font-size: 36px;
    }

    .verses-section {
      padding: 40px 20px;
      margin-top: 40px;
    }

    .verses-title {
      font-size: 22px;
    }

    .verses-subtitle {
      font-size: 14px;
    }

    .verses-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 40px;
    }

    .verse-number {
      font-size: 32px;
    }

    .verse-play-btn {
      width: 48px;
      height: 48px;
    }
  }

  @media (max-width: 480px) {
    .verses-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }

    .verse-number {
      font-size: 28px;
    }

    .verse-play-btn {
      width: 42px;
      height: 42px;
    }
  }
</style>
