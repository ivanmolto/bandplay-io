<script>
  import TrackItemLibrary from "./TrackItemLibrary.svelte";
  // export let address;
  export let myTipsStore;
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

<h3 class="px-6 py-6 text-gray-900 text-bold text-2xl">My Library</h3>
<section class="mt-2 px-6">
  {#each myTipsStore as myLibrary}
    <TrackItemLibrary id={myLibrary.track} />
  {/each}
</section>
