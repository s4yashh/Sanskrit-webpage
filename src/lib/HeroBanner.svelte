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
    height: 395px;
    width: 960px;
    max-width: 960px;
    margin: 0 auto;
    padding: 31.6px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('https://sanskrit.ie/images/gita_banner.png');
    background-attachment: scroll;
    background-clip: border-box;
    background-color: rgba(0, 0, 0, 0);
    background-origin: padding-box;
    background-position: 50% 50%;
    background-repeat: repeat;
    background-size: cover;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .banner-background {
    display: none;
  }

  .banner-image {
    display: none;
  }

  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(102, 90, 70, 0.3) 0%,
      rgba(102, 90, 70, 0.2) 50%,
      rgba(102, 90, 70, 0.3) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .banner-title {
    font-size: 72px;
    font-weight: 400;
    color: rgb(62, 73, 57);
    letter-spacing: 8px;
    text-align: center;
    margin: 0;
    font-family: Lato, "Noto Sans Devanagari", sans-serif;
    text-shadow: none;
    line-height: 28.44px;
    position: relative;
    z-index: 2;
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

  @media (max-width: 1024px) {
    .hero-banner {
      width: 100%;
      margin: 0;
      padding: 31.6px 20px;
    }
  }

  @media (max-width: 768px) {
    .hero-banner {
      height: 300px;
      width: 100%;
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
