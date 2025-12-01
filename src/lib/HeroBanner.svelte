<script lang="ts">
</script>

<section class="hero-banner">
  <div class="banner-background">
    <img src="/projector_black.png" alt="Krishna and Arjuna" class="banner-image" />
  </div>
  <div class="banner-overlay">
    <h1 class="banner-title">BHAGAVAD GITA</h1>
  </div>
  <div class="banner-decoration">
    <img src="/gita_open.png" alt="Open Gita" class="gita-book" />
  </div>
</section>

<style>
  .hero-banner {
    position: relative;
    height: 400px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .banner-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(102, 90, 70, 0.5) 0%,
      rgba(102, 90, 70, 0.4) 50%,
      rgba(102, 90, 70, 0.5) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .banner-title {
    font-size: 72px;
    font-weight: 300;
    color: #6b7d5f;
    letter-spacing: 8px;
    text-align: center;
    margin: 0;
    font-family: 'Georgia', serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .banner-decoration {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

  .gita-book {
    height: 100px;
    width: auto;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }

  @media (max-width: 768px) {
    .hero-banner {
      height: 300px;
    }

    .banner-title {
      font-size: 48px;
      letter-spacing: 4px;
    }

    .gita-book {
      height: 80px;
    }
  }
</style>
