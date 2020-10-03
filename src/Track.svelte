<script context="module">
  let current;
</script>

<script>
  import { arweave, txTags, txOwner, txData } from "./arweave.js";
  import Community from "community-js";
  import { read } from "./track.js";
  import { APP_NAME_TIPS, TIPS_FAN, CONTRACTID } from "./constants.js";
  export let wallet;
  export let address;
  export let txid;
  export let prevPage;
  let audio;
  let paused = true;
  $: render(txid);
  let track = {};
  let title = "";
  let artist = "";
  let author = "";
  $: artistRecipient = author;
  let tip = "";
  let payment = "";
  let contractwallet = "";
  let pstTokenizedTrack = "";
  let genre = "";
  let location = "";
  let badge = "";
  let license = "";
  let bootlegAvailable = "";
  let status = "";
  let apiVersion = "";
  let timestamp = "";
  let imageUrl = "";
  let musicUrl = "";
  let content = "";
  let pstRecipient;
  let feeDownload = 0.0;
  let pstFeeRecipient = 0.0;
  const render = async (txid) => {
    track = await read(txid);
    title = track["tags"]["Title"];
    artist = track["tags"]["Artist"];
    author = track["tags"]["Author"];
    musicUrl = track["tags"]["MusicUrl"];
    badge = track["tags"]["Badge"];
    tip = track["tags"]["Tip"];
    payment = track["tags"]["Payment"];
    contractwallet = track["tags"]["Contract"];
    genre = track["tags"]["Genre"];
    location = track["tags"]["Location"];
    license = track["tags"]["License"];
    bootlegAvailable = track["tags"]["Bootleg"];
    status = track["tags"]["Status"];
    apiVersion = track["tags"]["API"];
    timestamp = track["tags"]["Timestamp"];
    imageUrl = track["tags"]["ImageUrl"];
    content = track.data;
  };
  const submitDownload = async () => {
    let tipDownload = parseFloat(tip);
    pstFeeRecipient = tipDownload * 0.02;
    feeDownload = tipDownload - pstFeeRecipient;
    if (!wallet || !address) {
      return;
    }
    if (payment == "Wallet") {
      const client = new Arweave({
        host: "arweave.dev",
        port: 443,
        protocol: "https",
        timeout: 200000,
      });
      let community = new Community(client);
      await community.setCommunityTx(CONTRACTID);
      pstRecipient = await community.selectWeightedHolder();
      let pstTx = await arweave.createTransaction(
        {
          target: pstRecipient,
          quantity: arweave.ar.arToWinston(pstFeeRecipient),
        },
        wallet
      );
      await arweave.transactions.sign(pstTx, wallet);
      await arweave.transactions.post(pstTx);
      let artistTx = await arweave.createTransaction(
        {
          target: contractwallet,
          quantity: arweave.ar.arToWinston(feeDownload),
        },
        wallet
      );
      const tags = {
        "App-Name": APP_NAME_TIPS,
        TipsFan: TIPS_FAN + address,
        Fan: address,
        Track: txid,
        Title: title,
        Artist: artist,
        Genre: genre,
        ImageUrl: imageUrl,
        MusicUrl: musicUrl,
      };
      for (const [tagKey, tagValue] of Object.entries(tags)) {
        artistTx.addTag(tagKey, tagValue);
      }
      await arweave.transactions.sign(artistTx, wallet);
      await arweave.transactions.post(artistTx);
      const clone = { ...artistTx };
      clone["tags"] = tags;
      clone["data"] = content;
      clone["owner"] = address;
      window.localStorage.setItem(clone.id, JSON.stringify(clone));
    } else {
      const client = new Arweave({
        host: "arweave.dev",
        port: 443,
        protocol: "https",
        timeout: 200000,
      });
      let community = new Community(client);
      await community.setCommunityTx(CONTRACTID);
      pstRecipient = await community.selectWeightedHolder();
      let pstTx = await arweave.createTransaction(
        {
          target: pstRecipient,
          quantity: arweave.ar.arToWinston(pstFeeRecipient),
        },
        wallet
      );
      await arweave.transactions.sign(pstTx, wallet);
      await arweave.transactions.post(pstTx);
      let trackCommunity = new Community(client);
      await trackCommunity.setCommunityTx(CONTRACTID);
      pstTokenizedTrack = await trackCommunity.selectWeightedHolder();
      let artistTx = await arweave.createTransaction(
        {
          target: pstTokenizedTrack,
          quantity: arweave.ar.arToWinston(tipDownload),
        },
        wallet
      );
      const tags = {
        "App-Name": APP_NAME_TIPS,
        TipsFan: TIPS_FAN + address,
        Fan: address,
        Track: txid,
        Title: title,
        Artist: artist,
        Genre: genre,
        ImageUrl: imageUrl,
        MusicUrl: musicUrl,
      };
      for (const [tagKey, tagValue] of Object.entries(tags)) {
        artistTx.addTag(tagKey, tagValue);
      }
      await arweave.transactions.sign(artistTx, wallet);
      await arweave.transactions.post(artistTx);
      const clone = { ...artistTx };
      clone["tags"] = tags;
      clone["data"] = "";
      clone["owner"] = address;
      window.localStorage.setItem(clone.id, JSON.stringify(clone));
    }
    window.location.href = `#/library/${address}`;
  };
  function stopOthers() {
    if (current && current !== audio) current.pause();
    current = audio;
  }
</script>

<style>
  .email {
    padding: 0 0 0 1em;
    background: 0 50% no-repeat;
    background-size: 1em 1em;
    margin: 0 0 0.5em 0;
    line-height: 1.2;
    background-image: url(https://ghl62a64uierswzaztxoz3xiy572drcbqohmj7yjtsmwtk3sf6aa.arweave.net/MdftA9yiCRlbIMzu7O7ox3-hxEGDjsT_CZyZaatyL4A);
  }
  .aspect-16x9 {
    padding-bottom: 56.25%;
  }
  audio {
    width: 100%;
    margin: 0.5em 0 0.5em 0;
  }
</style>

<svelte:head>
  <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>
{#if prevPage == 'editor'}
  <div class="px-6 py-12">
    <h3 class="px-6 py-6 flex justify-center text-gray-900 text-bold text-2xl">
      Your track will be public once the network confirmation is done
    </h3>
  </div>
{:else}
  <div class="mt-8 flex">
    <div
      class="px-2 max-w-md mx-auto sm:max-w-lg lg:max-w-full lg:w-1/2 lg:px-5">
      <div class="xl:max-w-lg xl:ml_auto">
        <img
          class="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full
            sm:object-cover sm:object-center lg:hidden"
          src={imageUrl}
          alt={title} />
        <div class="relative px-4 -mt-10">
          <div
            class="lg:hidden bg-white rounded-lg px-1 py-1 shadow-lg opacity-75">
            <audio
              class="bg-white"
              bind:this={audio}
              bind:paused
              on:play={stopOthers}
              controls
              src={musicUrl}
              controlsList="nodownload" />
          </div>
        </div>
        {#if badge == 'Featured'}
          <div
            class="mt-10 text-gray-800 text-base font-semibold tracking-wide">
            <span
              class="inline-block bg-orange-300 text-gray-800 text-xs px-2
                rounded-md uppercase font-semibold tracking-wide">
              {badge}
            </span>
          </div>
        {/if}
        <h1
          class="text-2xl font-bold text-gray-900 leading-tight sm:mt-2
            sm:text-3xl md:mt-1 md:text-3xl lg:mt-4 lg:text-3xl xl:mt-4
            xl:text-3xl truncate">
          {title}
        </h1>
        <h2
          class="text-gray-600 text-xl font-normal sm:mt-2 sm:text-xl md:mt-1
            md:text-xl lg:text-2xl xl:text-2xl truncate">
          <a
            class="text-blue-900 underline hover:text-orange-600"
            href="#/artist/{author}">
            {artist}
          </a>
        </h2>
        <div
          class="mt-2 mb-2 text-gray-900 font-semibold text-base leading-tight
            md:truncate">
          {genre}
        </div>
        <form on:submit|preventDefault={submitDownload}>
          <div class="mt-3 lg:mt-2 sm:mt-6">
            <button
              type="submit"
              aria-label="Tip Download Track"
              class="inline-block px-5 py-3 rounded-lg shadow-lg bg-orange-600
                hover:bg-orange-500 text-white tracking-wider font-semibold
                sm:text-base">
              Get Download tipping
              {tip}
              AR
            </button>
          </div>
        </form>
        <div
          class="mt-1 mb-2 text-gray-900 font-light text-base leading-tight
            md:truncate">
          {license}
        </div>
        <div class="sm:mt-4 email mb-4">
          <a
            href="https://arweave.net/27WsYOcNHWweInDArUK94_GsBeuQKPXalsnwVPPRfe4?to={author}"
            target="_blank"
            rel="noopener"
            aria-label="Mail"
            class="text-base leading-tight rounded text-orange-600 font-light
              hover:text-orange-600 sm:text-sm sm:px-2">
            Show us your love
          </a>
        </div>
        <div class="mt-4">
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            class="twitter-share-button"
            data-show-count="false">Tweet</a>
        </div>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8">
        </script>
      </div>
    </div>
    <div class="hidden lg:block lg:w-1/2 lg:relative lg:mr-8">
      <img
        class="absolute inset-0 h-64 w-full object-cover object-center
          rounded-lg"
        src={imageUrl}
        alt={title} />
      <div class="relative px-4 -mt-2">
        <div class="mt-56 bg-white rounded-lg px-1 py-1 shadow-lg opacity-75">
          <audio
            class="bg-white"
            bind:this={audio}
            bind:paused
            on:play={stopOthers}
            controls
            src={musicUrl}
            controlsList="nodownload" />
        </div>
      </div>
    </div>
  </div>
  <div
    class="mt-8 px-2 max-w-md mx-auto sm:max-w-xl lg:max-w-full lg:px-6
      aspect-16x9">
    {@html content}
  </div>
{/if}
