<script>
  import { searchStore } from "./stores.js";
  let searchTerm = $searchStore;
  function applySearch() {
    searchStore.apply(searchTerm.toLowerCase());
  }
</script>

<div class="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto">
  <div class="px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
    <div class="py-6 grid grid-cols-2 gap-2 mb-2 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 items-center justify-between">
      <div class="place-self-start">
        <img src="https://arweave.net/mA-de7TIW-IjWH1t_4GDqIO9JtucT831rTKB1w2dCbo" alt="bandplayio" />
      </div>
      <div class="place-self-end">
        <div class="relative max-w-xs w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              class="h-6 w-6 fill-current text-orange-600"
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
            class="font-montserrat block w-full bg-gray-100 focus:outline-none focus:bg-gray-100 border-orange-400 focus:border-orange-600 shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-orange-900 focus:text-orange-600 text-orange-600 placeholder-orange-600 placeholder-opacity-50 focus:placeholder-orange-400 rounded-lg pl-10 pr-4 py-2"
            placeholder="Search music"
            bind:value={searchTerm}
            on:keyup={applySearch}
            on:change={applySearch}
            on:search={applySearch} />
        </div>
      </div>
    </div>
  </div>
</div>
