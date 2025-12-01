<script lang="ts">
  import { onMount } from 'svelte';
  
  let isSearchOpen = false;
  
  onMount(() => {
    // Add any header interactions here
  });
</script>

<header class="header">
  <div class="header-container">
    <div class="logo-section">
      <a href="/" class="logo">
        <img src="/logo.png" alt="Logo" />
      </a>
    </div>

    <nav class="nav-menu">
      <ul class="nav-list">
        <li><a href="#ayurveda">AYURVEDA</a></li>
        <li><a href="#yogasutras">YOGASUTRAS</a></li>
        <li><a href="#bhagavad-gita">BHAGAVAD GITA</a></li>
        <li><a href="#upanisads">UPANISADS</a></li>
        <li><a href="#sanskrit">SANSKRIT</a></li>
        <li><a href="#contact">CONTACT US</a></li>
      </ul>
    </nav>

    <div class="search-section">
      <button class="search-icon" on:click={() => (isSearchOpen = !isSearchOpen)} title="Search" aria-label="Search">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" />
          <path d="M12 12L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
      {#if isSearchOpen}
        <div class="search-box">
          <input type="text" placeholder="Search..." />
        </div>
      {/if}
    </div>
  </div>
</header>

<style>
  .header {
    background: #ffffff;
    padding: 20px 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-section {
    flex-shrink: 0;
  }

  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .logo img {
    height: 50px;
    width: auto;
  }

  .nav-menu {
    flex: 1;
    margin: 0 40px;
  }

  .nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 30px;
    align-items: center;
  }

  .nav-list a {
    text-decoration: none;
    color: #333333;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
    text-transform: uppercase;
  }

  .nav-list a:hover {
    color: #8b7355;
  }

  .search-section {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .search-icon {
    background: none;
    border: none;
    cursor: pointer;
    color: #333333;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;
  }

  .search-icon:hover {
    color: #8b7355;
  }

  .search-box {
    position: absolute;
    top: 70px;
    right: 40px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 15px;
  }

  .search-box input {
    border: none;
    outline: none;
    font-size: 14px;
    width: 200px;
  }

  @media (max-width: 768px) {
    .header {
      padding: 15px 20px;
    }

    .header-container {
      gap: 15px;
    }

    .nav-menu {
      margin: 0 20px;
    }

    .nav-list {
      gap: 15px;
    }

    .nav-list a {
      font-size: 11px;
    }
  }
</style>
