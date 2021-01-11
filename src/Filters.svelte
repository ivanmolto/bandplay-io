<script>
    import { createEventDispatcher } from "svelte";
    import { genresStore, badgesStore } from "./stores.js";
    import { selectGenres, selectBadges } from "./populate.js";
    const dispatch = createEventDispatcher();
    let genresFilter = $genresStore;
    let badgesFilter = $badgesStore;
    let genreSelected = $genresStore;
    let badgeSelected = $badgesStore;
</script>

<div class="font-montserrat font-semibold relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto -mt-10 text-white rounded-lg">
    <div class="px-4 sm:px-6 md:px-8">
        <div class="bg-orange-300 h-10 flex overflow-x-auto space-x-3">   
            {#each selectGenres as selectGenre}
                {#if $genresStore === selectGenre.label}
                    <button class="ml-1 flex-none place-self-center text-sm font-semibold bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50n rounded-3xl my-2 px-2.5 py-0.5 active:bg-gray-900 lowercase" on:click={() => {
                        genreSelected = selectGenre.label;
                        genresFilter = genreSelected;
                        genresStore.apply(genresFilter);
                        dispatch("apply");
                    } }>{selectGenre.label}</button>
                {:else}
                    <button class="ml-1 flex-none place-self-center text-sm font-semibold bg-orange-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50n rounded-3xl my-2 px-2.5 py-0.5 active:bg-gray-900 lowercase" on:click={() => {
                        genreSelected = selectGenre.label;
                        genresFilter = genreSelected;
                        genresStore.apply(genresFilter);
                        dispatch("apply");
                    } }>{selectGenre.label}</button>
                {/if}
            {/each} 
        </div>
    </div>
</div>
<div class="font-montserrat font-semibold relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto text-white">
    <div class="px-4 sm:px-6 md:px-8 mb-6">
        <div class="bg-orange-400 h-10 flex overflow-x-auto space-x-3">
            {#each selectBadges as selectBadge}
                {#if $badgesStore === selectBadge.label}
                    <button class="ml-1 flex-none place-self-center text-sm font-semibold bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50n rounded-3xl my-2 px-2.5 py-0.5 active:bg-gray-900 lowercase" on:click={() => {
                        badgeSelected = selectBadge.label;
                        badgesFilter = badgeSelected;
                        badgesStore.apply(badgesFilter);
                        dispatch("apply");
                    } }>{selectBadge.label}</button>
                {:else}
                    <button class="ml-1 flex-none place-self-center text-sm font-semibold bg-orange-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50n rounded-3xl my-2 px-2.5 py-0.5 active:bg-gray-900 lowercase" on:click={() => {
                        badgeSelected = selectBadge.label;
                        badgesFilter = badgeSelected;
                        badgesStore.apply(badgesFilter);
                        dispatch("apply");
                    } }>{selectBadge.label}</button>
                {/if}
            {/each}
        </div>
    </div>
</div>
