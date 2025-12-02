<script lang="ts">
</script>

<section class="hero-banner">
  <div class="banner-background">
    <img src="/projector_black.png" alt="Krishna and Arjuna" class="banner-image" />
  </div>
</section>

<style>
  .hero-banner {
    position: relative;
    height: 395px;
    width: auto;
    
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
