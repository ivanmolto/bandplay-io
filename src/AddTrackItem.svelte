<script>
  export let track;
</script>

<div class="mb-2">
  <a
    class="flex text-gray-600 hover:text-orange-600 hover:bg-white hover:shadow-md hover:font-semibold truncate content-center"
    target="_blank"
    rel="noopener"
    href={'https://arweave.net/' + track.musicUrl}><svg
      class="flex-none h-5 w-5 fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0, 0, 22, 22">
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
    </svg>
    <div class="font-montserrat align-top ml-2 flex-grow">{track.title}</div>
  </a>
</div>
