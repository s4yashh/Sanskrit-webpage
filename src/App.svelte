<script lang="ts">
  import Header from './lib/Header.svelte'
  import HeroBanner from './lib/HeroBanner.svelte'
  import GitaChapters from './lib/GitaChapters.svelte'
</script>

<Header />
<HeroBanner />
<GitaChapters />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
