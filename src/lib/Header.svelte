<script lang="ts">
  import searchIcon from '../assets/search.png';

  let isMobileMenuOpen = false;
  let openDropdown: string | null = null;

  const toggleDropdown = (dropdown: string) => {
    openDropdown = openDropdown === dropdown ? null : dropdown;
  };

  const closeAllDropdowns = () => {
    openDropdown = null;
  };
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container nav-container">
    <a class="navbar-brand" href="/">
      <img src="/images/logo.png" alt="Logo" />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      aria-label="Toggle navigation"
      aria-controls="navbarTogglerDemo01"
      aria-expanded={isMobileMenuOpen}
      on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      class="collapse navbar-collapse"
      id="navbarTogglerDemo01"
      class:show={isMobileMenuOpen}
    >
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        <!-- Search Icon Image -->
        <li class="nav-item">
          <a class="nav-link search-link" href="/search">
            <img src={searchIcon} alt="Search" class="search-img" />
          </a>
        </li>

        <!-- Ayurveda Dropdown -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="ayurvedaDropdown"
            role="button"
            on:click|preventDefault={() => toggleDropdown('ayurveda')}
            aria-haspopup="true"
            aria-expanded={openDropdown === 'ayurveda'}
          >
            ĀYURVEDA
          </a>
          <div
            class="dropdown-menu"
            aria-labelledby="ayurvedaDropdown"
            class:show={openDropdown === 'ayurveda'}
          >
            <a class="dropdown-item" href="/ayurved_level1">Introduction</a>
            <a class="dropdown-item" href="/ayurved_level2">Timing</a>
            <a class="dropdown-item" href="/ayurved_level3">Food</a>
          </div>
        </li>

        <!-- Yogasutras Dropdown -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="yogaDropdown"
            role="button"
            on:click|preventDefault={() => toggleDropdown('yoga')}
            aria-haspopup="true"
            aria-expanded={openDropdown === 'yoga'}
          >
            YOGASŪTRAS
          </a>
          <div
            class="dropdown-menu"
            aria-labelledby="yogaDropdown"
            class:show={openDropdown === 'yoga'}
          >
            <a class="dropdown-item" href="/yoga">Introduction</a>
            <a class="dropdown-item" href="/yoga_level1">Obstacles</a>
            <a class="dropdown-item" href="/yoga_level2">Practices</a>
            <a class="dropdown-item" href="/yoga_level3">Yogāsana</a>
            <a class="dropdown-item" href="/glossary">Glossary</a>
          </div>
        </li>

        <!-- Bhagavad Gita -->
        <li class="nav-item">
          <a class="nav-link" href="/gita">BHAGAVAD GĪTĀ</a>
        </li>

        <!-- Upanisads Dropdown -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="upanisadsDropdown"
            role="button"
            on:click|preventDefault={() => toggleDropdown('upanisads')}
            aria-haspopup="true"
            aria-expanded={openDropdown === 'upanisads'}
          >
            UPANIṢADS
          </a>
          <div
            class="dropdown-menu"
            aria-labelledby="upanisadsDropdown"
            class:show={openDropdown === 'upanisads'}
          >
            <a class="dropdown-item" href="/isa-upanishad">ĪŚOPANIṢAD</a>
            <a class="dropdown-item" href="/taitti">TAITTIRĪYOPANIṢAD</a>
            <a class="dropdown-item" href="/mandukyopanisad">MĀṆḌŪKYOPANIṢAD</a>
            <a class="dropdown-item" href="/kenopanisad">KENOPANIṢAD</a>
            <a class="dropdown-item" href="/kathopanishad">KAṬHOPANIṢAD</a>
            <a class="dropdown-item" href="/aitareyopanisad">AITAREYOPANIṢAD</a>
            <a class="dropdown-item" href="/mundakopanisad">MUṆḌAKOPANIṢAD</a>
            <a class="dropdown-item" href="/prasnopanisad">PRAŚNOPANIṢAD</a>
          </div>
        </li>

        <!-- Sanskrit Dropdown -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="sanskritDropdown"
            role="button"
            on:click|preventDefault={() => toggleDropdown('sanskrit')}
            aria-haspopup="true"
            aria-expanded={openDropdown === 'sanskrit'}
          >
            SANSKRIT
          </a>
          <div
            class="dropdown-menu"
            aria-labelledby="sanskritDropdown"
            class:show={openDropdown === 'sanskrit'}
          >
            <a class="dropdown-item" href="/sanskritam?q=Devotional"
              >Devotional Songs</a
            >
            <a class="dropdown-item" href="/sanskritam?q=Grammer"
              >Grammar Songs</a
            >
            <a class="dropdown-item" href="/sanskritam?q=Fun">Fun Songs</a>
            <a class="dropdown-item" href="/sanskritam?q=Script">Script Songs</a>
          </div>
        </li>

        <!-- Contact Us -->
        <li class="nav-item">
          <a class="nav-link" href="/contact">Contact us</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  .navbar {
    background-color: #f8f9fa;
    padding: 4.5rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 100;
  }

  .navbar.bg-light {
    background-color: #ffffff !important;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: 23px;
     justify-content: 12px;
    padding: 0 5px;
  }

  .navbar-brand {
    display: inline-block;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
    text-decoration: none;
    flex-shrink: 0;
    position: absolute;
    left: 17px;
    top: 4px;
  }

  .navbar-brand img {
    height: 60px;
    width: auto;
    display: block;

  }

  .navbar-toggler {
    padding: 0.25rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    cursor: pointer;
    display: none;
  }

  .navbar-toggler:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .navbar-toggler-icon {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
    content: '';
    background: no-repeat center / 100% 100%;
    border-top: 3px solid currentColor;
    border-right: 3px solid currentColor;
    border-bottom: 3px solid currentColor;
    border-left: 3px solid currentColor;
  }

  .collapse.navbar-collapse {
    display: flex;
    flex-basis: auto;
    margin-left: auto;
    margin-right: -240px;
    position: relative;
    top: -40px;
  }

  .collapse.navbar-collapse.show {
    display: flex !important;
  }

  .navbar-nav {
    display: flex;
    flex-direction: row;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    margin-left: auto;
    gap: 0;
  }

  .nav-item {
    position: relative;
  }

  .nav-link {
    display: block;
    padding: 0.5rem 1rem;
    color: #694f4fff;
    text-decoration: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.7400rem;
    font-weight: 100;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .nav-link:hover {
    color: #8b7355;
  }

  .nav-link.active {
    color: #333333;
  }

  .dropdown-toggle::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  }

  .dropdown-menu.show {
    display: block;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.5rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    text-decoration: none;
    cursor: pointer;
    font-size: 0.8125rem;
    font-family: inherit;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  }

  .dropdown-item:hover,
  .dropdown-item:focus {
    color: #c41e3a;
    background-color: #f8f9fa;
  }

  .dropdown-item.active,
  .dropdown-item:active {
    color: #fff;
    background-color: #007bff;
  }

  .dropdown-item.disabled,
  .dropdown-item:disabled {
    color: #6c757d;
    pointer-events: none;
    background-color: transparent;
  }

  .mt-2 {
    margin-top: 0.5rem !important;
  }

  .ml-auto {
    margin-left: auto !important;
  }

  @media (max-width: 991px) {
    .navbar-expand-lg {
      flex-wrap: wrap;
    }

    .navbar-expand-lg > .nav-container {
      flex-wrap: nowrap;
    }

    .navbar-expand-lg .navbar-toggler {
      display: block;
    }

    .navbar-expand-lg .collapse.navbar-collapse {
      display: none !important;
      flex-basis: 100%;
      width: 100%;
    }

    .navbar-expand-lg .collapse.navbar-collapse.show {
      display: flex !important;
      flex-direction: column;
    }

    .navbar-expand-lg .navbar-nav {
      flex-direction: column;
      margin-top: 0.5rem;
    }

    .navbar-expand-lg .navbar-nav .nav-link {
      padding: 0.5rem 0;
    }

    .navbar-expand-lg .dropdown-menu {
      position: static;
      float: none;
      width: 100%;
      margin: 0;
      padding: 0;
      border: none;
      box-shadow: none;
      background-color: #f9f9f9;
    }

    .navbar-expand-lg .dropdown-menu.show {
      display: block;
    }

    .navbar-expand-lg .dropdown-item {
      padding: 0.5rem 1rem 0.5rem 2rem;
    }
  }

  @media (max-width: 576px) {
    .nav-container {
      padding: 0 10px;
    }

    .navbar-brand img {
      height: 40px;
    }

    .nav-link {
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
    }

    .dropdown-item {
      padding: 0.5rem 1rem 0.5rem 1.5rem;
      font-size: 0.75rem;
    }
  }

  .search-link {
    display: flex;
    align-items: center;
  }

  .search-img {
    height: 24px;
    width: auto;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  .search-img:hover {
    opacity: 0.7;
  }
</style>
