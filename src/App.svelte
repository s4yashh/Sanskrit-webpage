<script lang="ts">
  import Header from './lib/Header.svelte'
  import HeroBanner from './lib/HeroBanner.svelte'
  import GitaIntro from './lib/GitaIntro.svelte'
  import GitaChapters from './lib/GitaChapters.svelte'
  import Footer from './lib/Footer.svelte'
</script>

<Header />
<HeroBanner />
<GitaIntro />
<GitaChapters />
<Footer />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
