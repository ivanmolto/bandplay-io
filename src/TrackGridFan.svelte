<script>
  import TrackItemFan from "./TrackItemFan.svelte";
  export let txid;
  export let myFansStore;
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

<h3 class="px-6 py-4 text-gray-900 text-bold text-2xl">We Are Fans Of</h3>
<section class="px-6">
  {#each myFansStore as weAreFansOf}
    <TrackItemFan {txid} id={weAreFansOf.track} />
  {/each}
</section>
