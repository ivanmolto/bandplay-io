<script>
  import TrackItem from "./TrackItem.svelte";
  import {
    searchStore,
    genresStore,
    badgesStore,
    locationsStore,
    bootlegsStore,
  } from "./stores.js";
  export let tracksStore;
  import { onMount } from "svelte";
  import { tracksByApp } from "./tracks.js";
  let tracksSearch = [];
  let resultsSearch = [];
  let resultsFilter = [1];
  let filtersEnded = false;
  $: noFiltersApply = resultsFilter.length;
  $: resultsFilter = tracksSearch.filter((trackSearch) => {
    const genre = trackSearch.tags["Genre"];
    const location = trackSearch.tags["Location"];
    const badge = trackSearch.tags["Badge"];
    const bootlegAvailable = trackSearch.tags["Bootleg"];
    if ($genresStore == "All") {
      if ($locationsStore == "All") {
        if ($badgesStore == "All") {
          if ($bootlegsStore == "All") {
            filtersEnded = true;
            return "All";
          } else {
            filtersEnded = true;
            return bootlegAvailable.includes($bootlegsStore);
          }
        } else {
          if ($bootlegsStore == "All") {
            filtersEnded = true;
            return badge.includes($badgesStore);
          } else {
            filtersEnded = true;
            return (
              badge.includes($badgesStore) &&
              bootlegAvailable.includes($bootlegsStore)
            );
          }
        }
      } else {
        if ($badgesStore == "All") {
          if ($bootlegsStore == "All") {
            filtersEnded = true;
            return location.includes($locationsStore);
          } else {
            filtersEnded = true;
            return (
              location.includes($locationsStore) &&
              bootlegAvailable.includes($bootlegsStore)
            );
          }
        } else {
          if ($bootlegsStore == "All") {
            filtersEnded = true;
            return (
              location.includes($locationsStore) && badge.includes($badgesStore)
            );
          } else {
            filtersEnded = true;
            return (
              location.includes($locationsStore) &&
              badge.includes($badgesStore) &&
              bootlegAvailable.includes($bootlegsStore)
            );
          }
        }
      }
    } else {
      if ($locationsStore == "All") {
        if ($badgesStore == "All") {
          if ($bootlegsStore == "All") {
            filtersEnded = true;
            return genre.includes($genresStore);
          } else {
            filtersEnded = true;
            return (
              genre.includes($genresStore) &&
              bootlegAvailable.includes($bootlegsStore)
            );
          }
        } else {
          if ($bootlegsStore == "All") {
            filtersEnded = true;
            return (
              genre.includes($bootlegsStore) && badge.includes($badgesStore)
            );
          } else {
            filtersEnded = true;
            return (
              genre.includes($genresStore) &&
              badge.includes($badgesStore) &&
              bootlegAvailable.includes($bootlegsStore)
            );
          }
        }
      } else {
        if ($badgesStore == "All") {
          if ($bootlegsStore == "All") {
            filtersEnded = true;
            return (
              genre.includes($genresStore) && location.includes($locationsStore)
            );
          } else {
            filtersEnded = true;
            return (
              genre.includes($genresStore) &&
              location.includes($locationsStore) &&
              bootlegAvailable.includes($bootlegsStore)
            );
          }
        } else {
          if ($bootlegsStore == "All") {
            filtersEnded = true;
            return (
              genre.includes($genresStore) &&
              location.includes($locationsStore) &&
              badge.includes($badgesStore)
            );
          } else {
            filtersEnded = true;
            return (
              genre.includes($genresStore) &&
              location.includes($locationsStore) &&
              badge.includes($badgesStore) &&
              bootlegAvailable.includes($bootlegsStore)
            );
          }
        }
      }
    }
  });
  $: resultsSearch = tracksSearch.filter((trackSearch) => {
    const title = trackSearch.tags["Title"].toLowerCase();
    const artist = trackSearch.tags["Artist"].toLowerCase();
    const content = trackSearch.data.toLowerCase();
    return (
      title.includes($searchStore) ||
      artist.includes($searchStore) ||
      content.includes($searchStore)
    );
  });
  onMount(async () => {
    tracksSearch = await tracksByApp();
  });
</script>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
  }
  @media (min-width: 640px) {
    section {
      grid-template-columns: repeat(2, 1fr);
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

{#if $searchStore == ''}
  <h3 class="px-6 py-6 text-gray-900 text-bold text-2xl truncate">
    {#if $badgesStore == 'All' && $locationsStore == 'All' && $bootlegsStore != 'All' && $genresStore == 'All'}
      Tracks with Bootlegs
      {$bootlegsStore}
    {:else if $badgesStore == 'All' && $locationsStore == 'All' && $bootlegsStore != 'All'}
      {$genresStore}
      Tracks with Bootlegs
      {$bootlegsStore}
    {:else if $badgesStore == 'All' && $locationsStore == 'All'}
      {$genresStore}
      Tracks
    {:else if $genresStore == 'All' && $badgesStore == 'All' && $locationsStore != 'All'}
      Tracks from
      {$locationsStore}
    {:else if $genresStore != 'All' && $badgesStore == 'All' && $locationsStore != 'All'}
      {$genresStore}
      Tracks from
      {$locationsStore}
    {:else if $genresStore == 'All' && $locationsStore == 'All' && $badgesStore != 'All'}
      {$badgesStore}
      Tracks
    {:else if $genresStore == 'All' && $locationsStore != 'All' && $badgesStore != 'All'}
      {$badgesStore}
      Tracks from
      {$locationsStore}
    {:else}{$badgesStore} {$genresStore} Tracks from {$locationsStore}{/if}
  </h3>
  <section class="mt-2 px-6">
    {#each tracksStore as track}
      {#if $genresStore == 'All'}
        {#if $locationsStore == 'All'}
          {#if $badgesStore == 'All'}
            {#if $bootlegsStore == 'All'}
              <TrackItem id={track.id} />
            {:else if track.bootlegAvailable == $bootlegsStore}
              <TrackItem id={track.id} />
            {/if}
          {:else if track.badge == $badgesStore}
            {#if $bootlegsStore == 'All'}
              <TrackItem id={track.id} />
            {:else if track.bootlegAvailable == $bootlegsStore}
              <TrackItem id={track.id} />
            {/if}
          {/if}
        {:else if track.location == $locationsStore}
          {#if $badgesStore == 'All'}
            {#if $bootlegsStore == 'All'}
              <TrackItem id={track.id} />
            {:else if track.bootlegAvailable == $bootlegsStore}
              <TrackItem id={track.id} />
            {/if}
          {:else if track.badge == $badgesStore}
            {#if $bootlegsStore == 'All'}
              <TrackItem id={track.id} />
            {:else if track.bootlegAvailable == $bootlegsStore}
              <TrackItem id={track.id} />
            {/if}
          {/if}
        {/if}
      {:else if track.genre == $genresStore}
        {#if $locationsStore == 'All'}
          {#if $badgesStore == 'All'}
            {#if $bootlegsStore == 'All'}
              <TrackItem id={track.id} />
            {:else if track.bootlegAvailable == $bootlegsStore}
              <TrackItem id={track.id} />
            {/if}
          {:else if track.badge == $badgesStore}
            {#if $bootlegsStore == 'All'}
              <TrackItem id={track.id} />
            {:else if track.bootlegAvailable == $bootlegsStore}
              <TrackItem id={track.id} />
            {/if}
          {/if}
        {:else if track.location == $locationsStore}
          {#if $badgesStore == 'All'}
            {#if $bootlegsStore == 'All'}
              <TrackItem id={track.id} />
            {:else if track.bootlegAvailable == $bootlegsStore}
              <TrackItem id={track.id} />
            {/if}
          {:else if track.badge == $badgesStore}
            {#if $bootlegsStore == 'All'}
              <TrackItem id={track.id} />
            {:else if track.bootlegAvailable == $bootlegsStore}
              <TrackItem id={track.id} />
            {/if}
          {/if}
        {/if}
      {/if}
    {/each}
  </section>
  {#if filtersEnded && noFiltersApply == 0}
    <h3
      class="px-6 py-6 text-gray-900 text-bold text-xl md:text-xl lg:text-2xl
        xl:text-2xl">
      Sorry, there are no tracks for these filters
      <br />
      Try filter for something else
    </h3>
  {/if}
{:else}
  {#if resultsSearch.length > 0}
    <h3 class="px-6 py-6 text-gray-900 text-bold text-2xl">
      Search results for "{$searchStore}"
    </h3>
    <section class="mt-2 px-6">
      {#each tracksStore as track}
        {#if track.title
          .toLowerCase()
          .includes(
            $searchStore
          ) || track.artist
            .toLowerCase()
            .includes(
              $searchStore
            ) || track.content.toLowerCase().includes($searchStore)}
          <TrackItem id={track.id} />
        {/if}
      {/each}
    </section>
  {:else}
    <h3
      class="px-6 py-6 text-gray-900 text-bold text-2xl md:text-2xl lg:text-3xl
        xl:text-3xl">
      Sorry, there are no tracks for "{$searchStore}"
      <br />
      Try searching for something else
    </h3>
  {/if}
{/if}
