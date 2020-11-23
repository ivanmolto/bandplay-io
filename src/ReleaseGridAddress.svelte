<script>
  import ReleaseItem from "./ReleaseItem.svelte";
  export let txid;
  export let releasesByArtistStore;
</script>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  @media (min-width: 640px) {
    section {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 1024px) {
    section {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (min-width: 1280px) {
    section {
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>

<section class="mt-4 px-6">
  {#each releasesByArtistStore as release}
    {#if release.author == txid}
      <ReleaseItem id={release.id} />
    {/if}
  {/each}
</section>
