<script>
  import AddGenreItem from "./AddGenreItem.svelte";
  export let customGenresStore;
</script>

{#if customGenresStore.length != 0}
  <div class="mt-4">Genres</div>
{/if}
<div class="flex flex-wrap">
  {#each customGenresStore as genre}
    <AddGenreItem {genre} />
  {:else}
    <div />
  {/each}
</div>
