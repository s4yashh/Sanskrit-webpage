<script lang="ts">
  import footerLogo from '../assets/footer.png';
</script>

<footer class="footer">
  <div class="footer-container">
    <div class="connect-section">
      <p class="connect-text">Connect</p>
      <div class="social-icons">
        <a href="https://www.facebook.com/RutgerSanskrit" target="_blank" class="social-icon facebook" title="Facebook">
          <i class="fa fa-facebook"></i>
        </a>
        <a href="https://twitter.com/RutgerSanskrit" target="_blank" class="social-icon twitter" title="Twitter">
          <i class="fa fa-twitter"></i>
        </a>
        <a href="https://www.youtube.com/c/RutgerSanskrit" target="_blank" class="social-icon youtube" title="YouTube">
          <i class="fa fa-youtube"></i>
        </a>
        <a href="https://www.johnscottus.ie/" target="_blank" class="social-icon website" title="Website">
          <i class="fa fa-globe"></i>
        </a>
      </div>
    </div>

    <div class="logo-section">
      <img src={footerLogo} alt="Logo" class="footer-logo" />
      <h1 class="brand-title">WELLBEING~SVASTI</h1>
    </div>

    <div class="copyright-section">
      <p class="copyright-text">© 2025 Rutger Kortenhorst. All Rights Reserved | Design and Developed by</p>
      <p class="developer-credit">Burning Desire Inclusive</p>
    </div>
  </div>
</footer>

<style>
  @font-face {
    font-family: 'Edensor';
    src: url('/src/assets/Edensor-FREE.otf') format('opentype');
  }

  @font-face {
    font-family: 'Lato';
    src: url('/src/assets/Bangers,Inter,Lato,Lexend_Deca,Montserrat,etc/Lato/Lato-Regular.ttf') format('truetype');
  }

  .footer {
    background-image: url('/src/assets/footerimg.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding: 30px 20px 0px 20px;
    text-align: center;
    color: #d4c4a0;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .connect-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    justify-content: center;
  }

  .connect-text {
    font-size: 24px;
    font-weight: 400;
    letter-spacing: 1px;
    margin: 0;
    color: #CACACA;
    font-family: 'Edensor', serif;
    white-space: nowrap;
  }

  .social-icons {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .social-icon i {
    display: inline-block;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .social-icon {
    width: 45px;
    height: 45px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }

  .social-icon:hover {
    background-color: #ffffff;
    color: #3D4C36;
    transform: scale(1.1);
  }

  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }

  .om-symbol {
    width: 60px;
    height: 60px;
    color: #f5f1e8;
    margin-bottom: 10px;
  }

  .footer-logo {
    height: 80px;
    width: auto;
    margin-bottom: 1px;
    display: block;
  }

  .brand-title {
    font-size: 40px;
    font-weight: 400;
    letter-spacing: 2px;
    margin: 5px 0 -20px 0;
    color: #AEA17E;
    font-family: 'Edensor', serif;
    text-transform: uppercase;
  }

  .copyright-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0px;
  }

  .copyright-text {
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.5px;
    margin: 0;
    color: #CACACA;
    font-family: 'Lato', sans-serif;
  }

  .developer-credit {
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 0.5px;
    margin: 0;
    color: #68B4A9;
    font-family: 'Lato', sans-serif;
  }

  @media (max-width: 768px) {
    .footer {
      padding: 40px 20px;
    }

    .footer-container {
      gap: 3px;
    }

    .brand-title {
      font-size: 22px;
      letter-spacing: 2px;
    }

    .copyright-text,
    .developer-credit {
      font-size: 12px;
    }

    .social-icon {
      width: 36px;
      height: 36px;
      font-size: 14px;
    }
  }
</style>
