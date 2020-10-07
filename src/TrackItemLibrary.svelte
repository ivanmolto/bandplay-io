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
    genre = track["tags"]["Genre"];
    imageUrl = track["tags"]["ImageUrl"];
  };
  function stopOthers() {
    if (current && current !== audio) current.pause();
    current = audio;
  }
</script>

<div>
  <div class="relative pb-5/6">
    <a href="#/track/{id}" class="no-underline">
      <img
        class="absolute inset-0 h-full w-full rounded-lg shadow-md object-cover"
        src={imageUrl}
        alt={title} />
    </a>
  </div>
  <div
    class={'relative px-4 -mt-16 ' + (paused ? 'text-gray-900' : 'text-orange-600')}>
    <div class="bg-white rounded-lg px-1 py-1 shadow-lg opacity-75">
      <audio
        class="bg-white w-full mt-2 mb-2"
        bind:this={audio}
        bind:paused
        on:play={stopOthers}
        controls
        src={musicUrl}>
        <track default kind="captions" srclang="en" />
      </audio>
      <div class="mt-1 font-semibold text-base leading-tight truncate">
        <a
          href="#/track/{id}"
          class="no-underline hover:text-orange-600">{title}</a>
      </div>
      <div
        class="mt-1 text-gray-900 font-light text-base leading-tight truncate">
        <a href="#/artist/{author}">{artist}</a>
      </div>
      <div
        class="mt-1 text-orange-900 font-bold text-sm leading-tight
          truncate">
        <a href={musicUrl} target="_blank" rel="noopener"> download </a>
      </div>
    </div>
  </div>
</div>
