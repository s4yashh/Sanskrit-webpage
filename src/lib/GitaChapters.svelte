<script lang="ts">
  interface Chapter {
    id: number;
    title: string;
    description: string;
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
        on:mouseenter={() => (hoveredChapter = chapter.id)}
        on:mouseleave={() => (hoveredChapter = null)}
        role="button"
        tabindex="0"
        on:keydown={(e) => {
          if (e.key === 'Enter') {
            // Navigate to chapter
          }
        }}
      >
        <div class="chapter-card-inner">
          <div class="chapter-image-wrapper">
            <img src="/images/gita_book.jpg" alt={`Chapter ${chapter.id}`} class="chapter-image" />
          </div>
          <div class="chapter-number">{chapter.id}</div>
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
</section>

<style>
  @font-face {
    font-family: 'Lato';
    src: url('/src/assets/Bangers,Inter,Lato,Lexend_Deca,Montserrat,etc/Lato/Lato-Regular.ttf') format('truetype');
  }

  .chapters-section {
    background: linear-gradient(135deg, #D4C4A0 0%, #E9DCB7 50%, #F0EDD7 100%);
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
    font-size: 28px;
    font-weight: 600;
    color: #c41e3a;
    letter-spacing: 2px;
    margin: 20px 0 15px 0;
    text-transform: uppercase;
    display: inline-block;
    font-family: 'Lato', sans-serif;
  }

  .title-divider {
    height: 3px;
    width: 200px;
    background-color: #c41e3a;
    margin: 0 auto 60px auto;
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
    height: 180px;
  }

  .chapter-card-inner {
    position: relative;
    width: 160px;
    height: 160px;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 48px;
    font-weight: bold;
    color: white;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    z-index: 10;
    mix-blend-mode: screen;
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
  }
</style>
