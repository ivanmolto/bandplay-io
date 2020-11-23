<script>
  import { onMount } from "svelte";
  import ReleaseItem from "./ReleaseItem.svelte";
  import {
    searchStore,
    genresStore,
    badgesStore,
    locationsStore,
    bootlegsStore,
  } from "./stores.js";
  import { releasesByApp } from "./releases.js";
  export let releasesStore;
  let releasesSearch = [];
  let resultsSearch = [];
  let resultsFilter = [1];
  let filtersEnded = false;
  $: noFiltersApply = resultsFilter.length;
  $: resultsFilter = releasesSearch.filter((releaseSearch) => {
    const genre = releaseSearch.tags["Genre"];
    const location = releaseSearch.tags["Location"];
    const badge = releaseSearch.tags["Badge"];
    const bootlegAvailable = releaseSearch.tags["Bootleg"];
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
  $: resultsSearch = releasesSearch.filter((releaseSearch) => {
    const title = releaseSearch.tags["Title"].toLowerCase();
    const artist = releaseSearch.tags["Artist"].toLowerCase();
    const content = releaseSearch.data.toLowerCase();
    return (
      title.includes($searchStore) ||
      artist.includes($searchStore) ||
      content.includes($searchStore)
    );
  });
  onMount(async () => {
    releasesSearch = await releasesByApp();
  });
</script>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
  }
  @media (min-width: 480px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 696px) {
    section {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 992px) {
    section {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (min-width: 1280px) {
    section {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  @media (min-width: 1440px) {
    section {
      grid-template-columns: repeat(6, 1fr);
    }
  }
  @media (min-width: 1824px) {
    section {
      grid-template-columns: repeat(7, 1fr);
    }
  }
</style>

{#if $searchStore == ''}
  <h3
    class="font-montserrat px-6 py-4 text-orange-600 text-bold text-2xl truncate">
    {#if $badgesStore == 'All' && $locationsStore == 'All' && $bootlegsStore != 'All' && $genresStore == 'All'}
      Releases with Bootlegs
      {$bootlegsStore}
    {:else if $badgesStore == 'All' && $locationsStore == 'All' && $bootlegsStore != 'All'}
      {$genresStore}
      Releases with Bootlegs
      {$bootlegsStore}
    {:else if $badgesStore == 'All' && $locationsStore == 'All'}
      Start Listening
    {:else if $genresStore == 'All' && $badgesStore == 'All' && $locationsStore != 'All'}
      Releases from
      {$locationsStore}
    {:else if $genresStore != 'All' && $badgesStore == 'All' && $locationsStore != 'All'}
      {$genresStore}
      Releases from
      {$locationsStore}
    {:else if $genresStore == 'All' && $locationsStore == 'All' && $badgesStore != 'All'}
      {$badgesStore}
      Releases
    {:else if $genresStore == 'All' && $locationsStore != 'All' && $badgesStore != 'All'}
      {$badgesStore}
      Releases from
      {$locationsStore}
    {:else}{$badgesStore} {$genresStore} Tracks from {$locationsStore}{/if}
  </h3>
  <section class="mt-2 px-6">
    {#each releasesStore as release}
      {#if $genresStore == 'All'}
        {#if $locationsStore == 'All'}
          {#if $badgesStore == 'All'}
            {#if $bootlegsStore == 'All'}
              <ReleaseItem id={release.id} />
            {:else if release.bootlegAvailable == $bootlegsStore}
              <ReleaseItem id={release.id} />
            {/if}
          {:else if release.badge == $badgesStore}
            {#if $bootlegsStore == 'All'}
              <ReleaseItem id={release.id} />
            {:else if release.bootlegAvailable == $bootlegsStore}
              <ReleaseItem id={release.id} />
            {/if}
          {/if}
        {:else if release.location == $locationsStore}
          {#if $badgesStore == 'All'}
            {#if $bootlegsStore == 'All'}
              <ReleaseItem id={release.id} />
            {:else if release.bootlegAvailable == $bootlegsStore}
              <ReleaseItem id={release.id} />
            {/if}
          {:else if release.badge == $badgesStore}
            {#if $bootlegsStore == 'All'}
              <ReleaseItem id={release.id} />
            {:else if release.bootlegAvailable == $bootlegsStore}
              <ReleaseItem id={release.id} />
            {/if}
          {/if}
        {/if}
      {:else if release.genre == $genresStore}
        {#if $locationsStore == 'All'}
          {#if $badgesStore == 'All'}
            {#if $bootlegsStore == 'All'}
              <ReleaseItem id={release.id} />
            {:else if release.bootlegAvailable == $bootlegsStore}
              <ReleaseItem id={release.id} />
            {/if}
          {:else if release.badge == $badgesStore}
            {#if $bootlegsStore == 'All'}
              <ReleaseItem id={release.id} />
            {:else if release.bootlegAvailable == $bootlegsStore}
              <ReleaseItem id={release.id} />
            {/if}
          {/if}
        {:else if release.location == $locationsStore}
          {#if $badgesStore == 'All'}
            {#if $bootlegsStore == 'All'}
              <ReleaseItem id={release.id} />
            {:else if release.bootlegAvailable == $bootlegsStore}
              <ReleaseItem id={release.id} />
            {/if}
          {:else if release.badge == $badgesStore}
            {#if $bootlegsStore == 'All'}
              <ReleaseItem id={release.id} />
            {:else if release.bootlegAvailable == $bootlegsStore}
              <ReleaseItem id={release.id} />
            {/if}
          {/if}
        {/if}
      {/if}
    {/each}
  </section>
  {#if filtersEnded && noFiltersApply == 0}
    <h3
      class="font-montserrat px-6 py-4 text-orange-600 text-bold text-xl md:text-xl lg:text-2xl
        xl:text-2xl">
      Sorry, there are no releases for these filters
      <br />
      Try filter for something else
    </h3>
  {/if}
{:else}
  {#if resultsSearch.length > 0}
    <h3 class="font-montserrat px-6 py-4 text-orange-600 text-bold text-2xl">
      Search results for "{$searchStore}"
    </h3>
    <section class="mt-2 px-6">
      {#each releasesStore as release}
        {#if release.title
          .toLowerCase()
          .includes(
            $searchStore
          ) || release.artist
            .toLowerCase()
            .includes(
              $searchStore
            ) || release.content.toLowerCase().includes($searchStore)}
          <ReleaseItem id={release.id} />
        {/if}
      {/each}
    </section>
  {:else}
    <h3 class="font-montserrat px-6 py-4 text-orange-600 text-bold text-2xl">
      Sorry, there are no releases for "{$searchStore}"
      <br />
      Try searching for something else
    </h3>
  {/if}
{/if}
