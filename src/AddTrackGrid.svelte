<script>
  import AddTrackItem from "./AddTrackItem.svelte";
  export let customTracksStore;
</script>

<div>
  {#if customTracksStore.length != 0}
    <div class="font-montserrat mb-1">Tracks</div>
  {/if}
  {#each customTracksStore as track}
    <AddTrackItem {track} />
  {:else}
    <div />
  {/each}
</div>
