<script>
  import { volumeStore } from "./stores.js";
  function volumeDown() {
    volumeStore.set(0.5);
  }
  function volumeMute() {
    volumeStore.set(0.0);
  }
  function volumeUp() {
    volumeStore.set(1.0);
  }
</script>

<style>
  button:active,
  button:focus {
    outline: none;
  }
</style>

{#if $volumeStore > 0.5}
  <button type="button" on:click={volumeDown} class="flex-none outline-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="self-center flex-1 h-6 w-6 fill-current text-gray-500 z-20 hover:text-orange-600">
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
  </button>
{:else if $volumeStore > 0.0}
  <button type="button" on:click={volumeMute} class="flex-none outline-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="self-center flex-1 h-6 w-6 fill-current text-gray-500 z-20 hover:text-orange-600">
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" /></svg>
  </button>
{:else}
  <button type="button" on:click={volumeUp} class="flex-none outline-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="self-center flex-1 h-6 w-6 fill-current text-gray-500 z-20 hover:text-orange-600">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M7 9v6h4l5 5V4l-5 5H7z" /></svg>
  </button>
{/if}
