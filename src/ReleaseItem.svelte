<script>
  import { read } from "./release.js";
  import {
    iconsStore,
    currentReleaseStore,
    previousReleaseStore,
    pausedStore,
  } from "./stores";
  export let id;
  $: render(id);
  let playIcon = true;
  let release = {};
  let timestamp;
  let author;
  let artist;
  let title;
  let genre;
  let tgenre;
  let imageUrl;
  let tip;
  let payment;
  let contractwallet;
  let location;
  let badge;
  let bootlegAvailable;
  let license;
  let playlist;
  let content;
  let audio;
  let paused = true;
  const render = async (id) => {
    release = await read(id);
    timestamp = release["tags"]["Timestamp"];
    author = release["tags"]["Author"];
    artist = release["tags"]["Artist"];
    title = release["tags"]["Title"];
    genre = release["tags"]["Genre"];
    imageUrl = release["tags"]["ImageUrl"];
    tip = release["tags"]["Tip"];
    payment = release["tags"]["Payment"];
    contractwallet = release["tags"]["Contract"];
    location = release["tags"]["Location"];
    badge = release["tags"]["Badge"];
    location = release["tags"]["Location"];
    bootlegAvailable = release["tags"]["Bootleg"];
    license = release["tags"]["License"];
    playlist = release["tags"]["Playlist"];
    content = release.data;
  };
  function handleClick() {
    if (id == $currentReleaseStore) {
      if ($iconsStore == "0") {
        pausedStore.set(false);
        iconsStore.apply("1");
        currentReleaseStore.apply(id);
      } else {
        pausedStore.set(true);
        iconsStore.apply("0");
        currentReleaseStore.apply(id);
      }
    } else if (id != $currentReleaseStore && $currentReleaseStore != " ") {
      if ($iconsStore == "0") {
        pausedStore.set(false);
        iconsStore.apply("1");
        currentReleaseStore.apply(id);
      } else {
        pausedStore.set(false);
        iconsStore.apply("1");
        currentReleaseStore.apply(id);
      }
    } else {
      pausedStore.set(false);
      iconsStore.apply("1");
      currentReleaseStore.apply(id);
    }
  }
</script>

<style>
  button:active,
  button:focus {
    outline: none;
  }
  button:hover {
    cursor: pointer;
  }
  .overlay {
    position: absolute;
    opacity: 0;
    transition: 0.3s ease;
    background: rgba(221, 107, 32, 0.1);
  }
  .release:hover .overlay {
    opacity: 1;
  }
  .icon {
    top: 50%;
    left: 50%;
  }
</style>

<div
  class="transition duration-500 ease-in-out transform hover:scale-105 truncate">
  <div class="rounded-lg shadow-lg">
    <div class="relative pb-5/6">
      {#if badge == 'Featured'}
        <span
          class=" bg-orange-600 text-white text-xs px-2 right-0 -mt-2 -mr-1
                rounded-md font-semibold absolute lowercase tracking-wide z-10">
          {badge}
        </span>
      {/if}
      <div class="release">
        <img
          class="absolute inset-0 h-full w-full shadow-md object-cover rounded-lg rounded-b-none"
          src={imageUrl}
          alt={title} />
        <div class="overlay w-full h-full">
          <button
            type="button"
            class="w-full h-full flex"
            on:click={handleClick}>
            {#if $currentReleaseStore == ' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="self-center flex-1 h-12 w-12 fill-current text-orange-600 z-20 hover:text-orange-500">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
            {:else if id == $currentReleaseStore && $iconsStore == '0'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="self-center flex-1 h-12 w-12 fill-current text-orange-600 z-20 hover:text-orange-500">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
            {:else if id == $currentReleaseStore && $iconsStore == '1'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="self-center flex-1 h-12 w-12 fill-current text-orange-600 z-20 hover:text-orange-500"><path
                  d="M0 0h24v24H0z"
                  fill="none" />
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" /></svg>
            {:else if id != $currentReleaseStore}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="self-center flex-1 h-12 w-12 fill-current text-orange-600 z-20 hover:text-orange-500">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="self-center flex-1 h-12 w-12 fill-current text-orange-600 z-20 hover:text-orange-500">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
            {/if}
          </button>
        </div>
      </div>
    </div>
    <div class={'relative' + (paused ? 'text-gray-900' : 'text-orange-600')}>
      <div class="font-montserrat bg-white px-1 py-1 rounded-b-lg">
        <div class="mt-1 font-semibold text-base leading-tight truncate">
          <a
            href="#/release/{id}"
            class="no-underline hover:text-orange-600">{title}</a>
        </div>
        <div
          class="mt-1 text-gray-900 hover:text-orange-600 font-light text-base leading-tight truncate">
          <a href="#/artist/{author}">{artist}</a>
        </div>
      </div>
    </div>
  </div>
</div>
