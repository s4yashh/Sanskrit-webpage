<script lang="ts">
</script>

<footer class="footer">
  <div class="footer-container">
    <div class="connect-section">
      <p class="connect-text">Connect</p>
      <div class="social-icons">
        <a href="#" class="social-icon facebook" title="Facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#" class="social-icon twitter" title="Twitter">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#" class="social-icon youtube" title="YouTube">
          <i class="fab fa-youtube"></i>
        </a>
        <a href="#" class="social-icon website" title="Website">
          <i class="fas fa-link"></i>
        </a>
      </div>
    </div>

    <div class="logo-section">
      <img src="/src/assets/footer.png" alt="Logo" class="footer-logo" />
      <h1 class="brand-title">WELLBEING-SVASTI</h1>
    </div>

    <div class="copyright-section">
      <p class="copyright-text">© 2025 Rutger Kortenhorst. All Rights Reserved | Design and Developed by</p>
      <p class="developer-credit">Burning Desire Inclusive</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: #3D4C36;
    padding: 0px 20px;
    text-align: center;
    color: #d4c4a0;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0px;
  }

  .connect-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .connect-text {
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1px;
    margin: 0;
    color: #d4c4a0;
    font-family: 'Georgia', serif;
  }

  .social-icons {
    display: flex;
    gap: 15px;
    justify-content: center;
  }

  .social-icon {
    width: 40px;
    height: 40px;
    border: 2px solid #d4c4a0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d4c4a0;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 16px;
  }

  .social-icon:hover {
    background-color: #d4c4a0;
    color: #4a6b5a;
  }

  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
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
    margin-bottom: 10px;
    display: block;
  }

  .brand-title {
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 2px;
    margin: 5px 0 0 0;
    color: #d4c4a0;
    font-family: 'Georgia', serif;
    text-transform: uppercase;
  }

  .copyright-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .copyright-text {
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 0.5px;
    margin: 0;
    color: #c5b89e;
    font-family: 'Georgia', serif;
  }

  .developer-credit {
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 0.5px;
    margin: 0;
    color: #8fa882;
    font-family: 'Georgia', serif;
  }

  @media (max-width: 768px) {
    .footer {
      padding: 40px 20px;
    }

    .footer-container {
      gap: 30px;
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
