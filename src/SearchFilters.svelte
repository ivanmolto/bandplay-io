<script>
  import {
    searchStore,
    genresStore,
    badgesStore,
    locationsStore,
    bootlegsStore,
  } from "./stores.js";
  import {
    selectGenres,
    selectLocations,
    selectBadges,
    selectBootlegs,
  } from "./populate.js";
  import { createEventDispatcher } from "svelte";
  let isOpen = false;
  let searchTerm = $searchStore;
  let genresFilter = $genresStore;
  let badgesFilter = $badgesStore;
  let locationsFilter = $locationsStore;
  let bootlegsFilter = $bootlegsStore;
  let genreSelected = $genresStore;
  let locationSelected = $locationsStore;
  let badgeSelected = $badgesStore;
  let bootlegSelected = $bootlegsStore;
  const dispatch = createEventDispatcher();
  function applySearch() {
    searchStore.apply(searchTerm.toLowerCase());
  }
  function handleClick() {
    isOpen = !isOpen;
  }
  function applyFilter() {
    genresStore.apply(genresFilter);
    badgesStore.apply(badgesFilter);
    locationsStore.apply(locationsFilter);
    bootlegsStore.apply(bootlegsFilter);
    isOpen = !isOpen;
    dispatch("apply");
  }
  function handleSelectedGenre() {
    genresFilter = genreSelected;
  }
  function handleSelectedLocation() {
    locationsFilter = locationSelected;
  }
  function handleSelectedBadge() {
    badgesFilter = badgeSelected;
  }
  function handleSelectedBootleg() {
    bootlegsFilter = bootlegSelected;
  }
</script>

<section class="font-montserrat bg-gray-800">
  <div class="flex justify-between px-4 py-3">
    <div class="px-2 relative max-w-xs w-full">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          class="h-6 w-6 fill-current text-gray-600"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12
            2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1
            1.41-1.41l.01-.01zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
        </svg>
      </div>
      <input
        type="search"
        aria-label="Search"
        class="block w-full bg-gray-900 focus:outline-none focus:bg-white
          focus:text-gray-900 text-white rounded-lg pl-10 pr-4 py-2"
        placeholder="Search and discover music"
        bind:value={searchTerm}
        on:keyup={applySearch}
        on:change={applySearch}
        on:search={applySearch} />
    </div>
    {#if isOpen == true}
      <button
        type="button"
        aria-label="Filters"
        class="ml-4 inline-flex items-center hover:bg-gray-600
          focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4
          bg-gray-600"
        on:click={handleClick}>
        <svg
          class="h-6 w-6 fill-current text-gray-500"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3 6a1 1 0 0
            1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm4 5a1 1 0 1 0 0 2h4a1 1 0 1
            0 0-2h-4z" />
        </svg>
        <span class="ml-1 text-white font-medium">Filters</span>
      </button>
    {:else}
      <button
        type="button"
        aria-label="Filters"
        class="ml-4 inline-flex items-center hover:bg-gray-600
          focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4
          bg-gray-700"
        on:click={handleClick}>
        <svg
          class="h-6 w-6 fill-current text-gray-500"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3 6a1 1 0 0
            1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm4 5a1 1 0 1 0 0 2h4a1 1 0 1
            0 0-2h-4z" />
        </svg>
        <span class="ml-1 text-white font-medium">Filters</span>
      </button>
    {/if}
  </div>
  {#if isOpen == false}
    <form class="hidden">
      <div class="lg:flex">
        <div class="px-4 py-4 border-t border-gray-900 lg:w-1/4 lg:border-l">
          <span class="block text-md font-semibold text-gray-500">
            Genres
          </span>
          <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
            <select
              class="mt-1 form-select block w-full text-white shadow bg-gray-700
                hover:border-gray-500 focus:bg-gray-600 border-none"
              bind:value={genreSelected}
              on:blur={handleSelectedGenre}>
              {#each selectGenres as selectGenre}
                <option value={selectGenre}>{selectGenre}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="px-4 py-4 border-t border-gray-900 lg:w-1/4 lg:border-l">
          <span
            class="block text-md font-semibold text-gray-500">Locations</span>
          <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
            <select
              class="mt-1 form-select block w-full text-white shadow bg-gray-700
                hover:border-gray-500 focus:bg-gray-600 border-none"
              bind:value={locationSelected}
              on:blur={handleSelectedLocation}>
              {#each selectLocations as selectLocation}
                <option value={selectLocation}>{selectLocation}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="px-4 py-4 border-t border-gray-900 lg:w-1/4 lg:border-l">
          <span class="block text-md font-semibold text-gray-500"> Badge </span>
          <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
            <select
              class="mt-1 form-select block w-full text-white shadow bg-gray-700
                hover:border-gray-500 focus:bg-gray-600 border-none"
              bind:value={badgeSelected}
              on:blur={handleSelectedBadge}>
              {#each selectBadges as selectBadge}
                <option value={selectBadge}>{selectBadge}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="px-4 py-4 border-t border-gray-900 lg:w-1/4 lg:border-l">
          <span
            class="block text-md font-semibold text-gray-500">Bootlegs</span>
          <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
            <select
              class="mt-1 form-select block w-full text-white shadow bg-gray-700
                hover:border-gray-500 focus:bg-gray-600 border-none"
              bind:value={bootlegSelected}
              on:blur={handleSelectedBootleg}>
              {#each selectBootlegs as selectBootleg}
                <option value={selectBootleg}>{selectBootleg}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
      <div class="bg-gray-900 px-4 py-4 sm:text-right">
        <button
          type="button"
          aria-label="Apply Filters"
          class="block w-full sm:w-auto sm:inline-block bg-orange-600
            hover:bg-orange-500 font-semibold text-white px-4 py-2 rounded-lg"
          on:click={applyFilter}>
          Apply
        </button>
      </div>
    </form>
  {:else}
    <form class="block">
      <div class="lg:flex">
        <div class="px-4 py-4 border-t border-gray-900 lg:w-1/4 lg:border-l">
          <span class="block text-md font-semibold text-gray-500">
            Genres
          </span>
          <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
            <select
              class="mt-1 form-select block w-full text-white shadow bg-gray-700
                hover:border-gray-500 focus:bg-gray-600 border-none"
              bind:value={genreSelected}
              on:blur={handleSelectedGenre}>
              {#each selectGenres as selectGenre}
                <option value={selectGenre}>{selectGenre}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="px-4 py-4 border-t border-gray-900 lg:w-1/4 lg:border-l">
          <span
            class="block text-md font-semibold text-gray-500">Locations</span>
          <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
            <select
              class="mt-1 form-select block w-full text-white shadow bg-gray-700
                hover:border-gray-500 focus:bg-gray-600 border-none"
              bind:value={locationSelected}
              on:blur={handleSelectedLocation}>
              {#each selectLocations as selectLocation}
                <option value={selectLocation}>{selectLocation}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="px-4 py-4 border-t border-gray-900 lg:w-1/4 lg:border-l">
          <span class="block text-md font-semibold text-gray-500">
            Badges
          </span>
          <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
            <select
              class="mt-1 form-select block w-full text-white shadow bg-gray-700
                hover:border-gray-500 focus:bg-gray-600 border-none"
              bind:value={badgeSelected}
              on:blur={handleSelectedBadge}>
              {#each selectBadges as selectBadge}
                <option value={selectBadge}>{selectBadge}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="px-4 py-4 border-t border-gray-900 lg:w-1/4 lg:border-l">
          <span
            class="block text-md font-semibold text-gray-500">Bootlegs</span>
          <div class="sm:flex sm:-mx-2 lg:block lg:mx-0">
            <select
              class="mt-1 form-select block w-full text-white shadow bg-gray-700
                hover:border-gray-500 focus:bg-gray-600 border-none"
              bind:value={bootlegSelected}
              on:blur={handleSelectedBootleg}>
              {#each selectBootlegs as selectBootleg}
                <option value={selectBootleg}>{selectBootleg}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
      <div class="bg-gray-900 px-4 py-4 sm:text-right">
        <button
          type="button"
          aria-label="Apply Filters"
          class="block w-full sm:w-auto sm:inline-block bg-orange-600
            hover:bg-orange-500 font-semibold text-white px-4 py-2 rounded-lg"
          on:click={applyFilter}>
          Apply
        </button>
      </div>
    </form>
  {/if}
</section>
