<script lang="ts">
  import { onMount } from 'svelte';

  interface Chapter {
    id: number;
    title: string;
    description: string;
  }

  interface Verse {
    chapter: number;
    verse: number;
    text: string;
    transliteration: string;
    meaning: string;
  }

  const chapters: Chapter[] = [
    { id: 1, title: 'Chapter 1', description: 'Arjuna Vishada Yoga' },
    { id: 2, title: 'Chapter 2', description: 'Sankhya Yoga' },
    { id: 3, title: 'Chapter 3', description: 'Karma Yoga' },
    { id: 4, title: 'Chapter 4', description: 'Jnana Yoga' },
    { id: 5, title: 'Chapter 5', description: 'Sannyasa Yoga' },
    { id: 6, title: 'Chapter 6', description: 'Dhyana Yoga' },
    { id: 7, title: 'Chapter 7', description: 'Jnana Vijnana Yoga' },
    { id: 8, title: 'Chapter 8', description: 'Aksara Brahma Yoga' },
    { id: 9, title: 'Chapter 9', description: 'Raja Vidya Yoga' },
    { id: 10, title: 'Chapter 10', description: 'Vibhuti Yoga' },
    { id: 11, title: 'Chapter 11', description: 'Visvarupa Darsana Yoga' },
    { id: 12, title: 'Chapter 12', description: 'Bhakti Yoga' },
    { id: 13, title: 'Chapter 13', description: 'Kshetra Kshetrajna Yoga' },
    { id: 14, title: 'Chapter 14', description: 'Gunatraya Vibhaga Yoga' },
    { id: 15, title: 'Chapter 15', description: 'Purushottama Yoga' },
    { id: 16, title: 'Chapter 16', description: 'Daivasura Sampad Yoga' },
    { id: 17, title: 'Chapter 17', description: 'Shraddhatraya Vibhaga Yoga' },
    { id: 18, title: 'Chapter 18', description: 'Moksha Sannyasa Yoga' },
  ];

  let hoveredChapter: number | null = null;
  let selectedChapter: number | null = null;
  let verses: any[] = [];
  let isLoading = false;
  let error: string | null = null;

  /**
   * Fetch verses for a specific chapter from the API
   * Uses Vercel serverless API proxy to bypass CORS restrictions
   */
  async function fetchVerses(chapterNumber: number) {
    isLoading = true;
    error = null;
    verses = [];

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

      // Extract verses array from response
      verses = Array.isArray(json) ? json : json.data || [];

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
    fetchVerses(chapterId);
  }

  onMount(() => {
    // Load Chapter 1 verses by default when component mounts
    fetchVerses(1);
  });
</script>

<section class="chapters-section">
  <div class="book-image-container">
    <img src="/images/gita_open.png" alt="Open Gita Book" class="book-image" />
  </div>
  <h2 class="section-title">GITA CHAPTERS</h2>
  <div class="title-divider"></div>
  
  <div class="chapters-grid">
    {#each chapters as chapter (chapter.id)}
      <div
        class="chapter-card"
        class:active={selectedChapter === chapter.id}
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

  <!-- Verses Display Section -->
  {#if selectedChapter !== null}
    <div class="verses-section">
      <h3 class="verses-title">
        {chapters.find(c => c.id === selectedChapter)?.title}
        {#if chapters.find(c => c.id === selectedChapter)?.description}
          <span class="verses-subtitle">— {chapters.find(c => c.id === selectedChapter)?.description}</span>
        {/if}
      </h3>
      
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
        <div class="verses-list">
          {#each verses as verse (verse.geeta_id)}
            <div class="verse-card">
              <div class="verse-content">
                <!-- Render the HTML lyrics provided by API -->
                {#if verse.lyrics}
                  <div class="verse-lyrics">
                    {@html verse.lyrics}
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</section>

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
  .verses-section {
    background: #F0E5BE;
    padding: 60px 40px;
    margin-top: 60px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .verses-title {
    font-size: 28px;
    font-weight: 600;
    color: #352c2c;
    margin: 0 0 10px 0;
    font-family: 'Lato', sans-serif;
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

  .verses-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 40px;
  }

  .verse-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .verse-card:hover {
    transform: translateX(5px);
    box-shadow: none;
  }

  .verse-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .verse-text,
  .verse-transliteration,
  .verse-meaning {
    flex: 1;
  }

  .verse-text h4,
  .verse-transliteration h4,
  .verse-meaning h4 {
    font-size: 14px;
    font-weight: 600;
    color: #BD003C;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Lato', sans-serif;
  }

  .verse-text p,
  .verse-transliteration p,
  .verse-meaning p {
    font-size: 14px;
    line-height: 1.8;
    color: #333;
    margin: 0;
    font-family: 'Lato', sans-serif;
    font-style: normal;
  }

  .verse-text p {
    font-style: italic;
    color: #555;
  }

  .verse-meaning p {
    color: #444;
    line-height: 1.9;
  }

  /* Verse Lyrics (HTML content from API) */
  .verse-lyrics {
    flex: 1;
    font-size: 14px;
    line-height: 1.8;
    color: white;
    font-family: 'Noto Sans', sans-serif;
    font-weight: 200;
  }

  .verse-lyrics :global(h4) {
    font-size: 14px;
    font-weight: 600;
    color: white;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Noto Sans', sans-serif;
  }

  .verse-lyrics :global(p) {
    margin: 10px 0;
    color: white;
  }

  .verse-lyrics :global(em) {
    font-style: italic;
    color: white;
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

    .verse-content {
      grid-template-columns: 1fr;
    }

    .verse-card {
      padding: 20px;
    }

    .verse-text p,
    .verse-transliteration p,
    .verse-meaning p {
      font-size: 13px;
    }
  }
</style>
