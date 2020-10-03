<script context="module">
  let current;
</script>

<script>
  import { read } from "./track.js";
  export let id;
  $: render(id);
  let track = {};
  let title;
  let artist;
  let tip;
  let payment;
  let contractwallet;
  let genre;
  let location;
  let badge;
  let author;
  let license;
  let bootlegAvailable;
  let status;
  let apiVersion;
  let timestamp;
  let imageUrl;
  let musicUrl;
  let content;
  let audio;
  let paused = true;
  const render = async (id) => {
    track = await read(id);
    title = track["tags"]["Title"];
    artist = track["tags"]["Artist"];
    author = track["tags"]["Author"];
    musicUrl = track["tags"]["MusicUrl"];
    tip = track["tags"]["Tip"];
    payment = track["tags"]["Payment"];
    contractwallet = track["tags"]["Contract"];
    genre = track["tags"]["Genre"];
    badge = track["tags"]["Badge"];
    location = track["tags"]["Location"];
    license = track["tags"]["License"];
    bootlegAvailable = track["tags"]["Bootleg"];
    status = track["tags"]["Status"];
    apiVersion = track["tags"]["API"];
    timestamp = track["tags"]["Timestamp"];
    imageUrl = track["tags"]["ImageUrl"];
    content = track.data;
  };
  function stopOthers() {
    if (current && current !== audio) current.pause();
    current = audio;
  }
</script>

<style>
  audio {
    width: 100%;
    margin: 0.5em 0 0.5em 0;
  }
  .playing {
    color: #dd6b20;
  }
</style>

<div>
  <div class="relative pb-5/6">
    <a href="#/track/{id}" class="no-underline">
      <img
        class="absolute inset-0 h-full w-full rounded-lg shadow-md object-cover"
        src={imageUrl}
        alt={title} />
    </a>
  </div>
  <div class="relative px-4 -mt-16" class:playing={!paused}>
    <div class="bg-white rounded-lg px-1 py-1 shadow-lg opacity-75">
      <audio
        class="bg-white"
        bind:this={audio}
        bind:paused
        on:play={stopOthers}
        controls
        src={musicUrl}
        controlsList="nodownload" />
      <div class="mt-1 font-semibold text-base leading-tight truncate">
        <a
          href="#/track/{id}"
          class="no-underline hover:text-orange-600">{title}</a>
      </div>
      <div
        class="mt-1 text-gray-900 font-light text-base leading-tight truncate">
        <a href="#/artist/{author}">{artist}</a>
      </div>
      <div class="flex">
        <div
          class="w-3/5 mt-1 text-gray-900 font-light lowercase text-sm leading-tight
          truncate">
          {genre}
        </div>
        <div class="w-2/5">
          {#if badge == 'Featured'}
            <span
              class=" bg-orange-300 text-gray-800 text-xs px-2 inline-block
                rounded-md font-semibold tracking-wide lowercase">
              {badge}
            </span>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
