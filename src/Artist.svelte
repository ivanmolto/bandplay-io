<script>
  import { onMount } from "svelte";
  import ReleaseGridAddress from "./ReleaseGridAddress.svelte";
  import ReleaseGridFan from "./ReleaseGridFan.svelte";
  import { releasesByArtistStore, myFansStore } from "./stores.js";
  import {
    accountByAddress,
    releasesByAddress,
    myReleasesTipped,
  } from "./releases.js";
  import { TIPS_FAN } from "./constants";
  import { documentTitle } from "./helpers.js";
  export let txid;
  let titleArtist = "";
  let accountActivated = false;
  let referralFans = false;
  let handleName = "";
  let headerUrl = "";
  let websiteUrl = "";
  let facebookUrl = "";
  let twitterUrl = "";
  let accountSettings;
  let releasesArtist = [];
  let releasesAddress = [];
  const tipTag = TIPS_FAN + txid;
  let releasesFansOf = [];
  let referredReleases = [];
  onMount(async () => {
    releasesAddress = await releasesByAddress(txid);
    for (let i = 0; i < releasesAddress.length; i++) {
      titleArtist = releasesAddress[i].tags["Artist"];
      let item = {
        id: releasesAddress[i].id,
        timestamp: releasesAddress[i].tags["Timestamp"],
        author: releasesAddress[i].tags["Author"],
        artist: releasesAddress[i].tags["Artist"],
        title: releasesAddress[i].tags["Title"],
        genre: releasesAddress[i].tags["Genre"],
        tgenre: releasesAddress[i].tags["Tgenre"],
        imageUrl: releasesAddress[i].tags["ImageUrl"],
        tip: releasesAddress[i].tags["Tip"],
        payment: releasesAddress[i].tags["Payment"],
        contractWallet: releasesAddress[i].tags["Contract"],
        location: releasesAddress[i].tags["Location"],
        badge: releasesAddress[i].tags["Badge"],
        bootlegAvailable: releasesAddress[i].tags["Bootleg"],
        license: releasesAddress[i].tags["License"],
        playlist: releasesAddress[i].tags["Playlist"],
        content: releasesAddress[i].data,
      };
      releasesArtist.push(item);
    }
    releasesByArtistStore.set(releasesArtist);
    accountSettings = await accountByAddress(txid);
    if (accountSettings.length == 1) {
      accountActivated = true;
      handleName = accountSettings[0].tags["HandleName"];
      headerUrl = accountSettings[0].tags["HeaderUrl"];
      websiteUrl = accountSettings[0].tags["WebsiteUrl"];
      facebookUrl = accountSettings[0].tags["FacebookUrl"];
      twitterUrl = accountSettings[0].tags["TwitterUrl"];
      titleArtist = handleName;
    }
    referredReleases = await myReleasesTipped(tipTag);
    if (referredReleases.length >= 1) {
      referralFans = true;
      for (let j = 0; j < referredReleases.length; j++) {
        let fansOf = {
          id: referredReleases[j].id,
          track: referredReleases[j].tags["Track"],
          title: referredReleases[j].tags["Title"],
          artist: referredReleases[j].tags["Artist"],
          genre: referredReleases[j].tags["Genre"],
          imageUrl: referredReleases[j].tags["ImageUrl"],
          musicUrl: referredReleases[j].tags["MusicUrl"],
        };
        releasesFansOf.push(fansOf);
      }
      myFansStore.set(releasesFansOf);
    }
    documentTitle(titleArtist);
  });
</script>

{#if accountActivated}
  <div class="px-6 flex mt-2">
    <div class="flex-1">
      <a href={websiteUrl} target="_blank" rel="noopener" aria-label="Website">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          class="h-8 w-8 fill-current text-orange-600">
          <path
            d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" /></svg>
      </a>
    </div>
    <div class="flex-1">
      <a
        href="https://arweave.net/27WsYOcNHWweInDArUK94_GsBeuQKPXalsnwVPPRfe4?to={txid}"
        target="_blank"
        rel="noopener"
        aria-label="Mail">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="h-8 w-8 fill-current text-orange-600">
          <path
            d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM178.117 262.104C87.429 196.287 88.353 196.121 64 177.167V152c0-13.255 10.745-24 24-24h272c13.255 0 24 10.745 24 24v25.167c-24.371 18.969-23.434 19.124-114.117 84.938-10.5 7.655-31.392 26.12-45.883 25.894-14.503.218-35.367-18.227-45.883-25.895zM384 217.775V360c0 13.255-10.745 24-24 24H88c-13.255 0-24-10.745-24-24V217.775c13.958 10.794 33.329 25.236 95.303 70.214 14.162 10.341 37.975 32.145 64.694 32.01 26.887.134 51.037-22.041 64.72-32.025 61.958-44.965 81.325-59.406 95.283-70.199z" /></svg>
      </a>
    </div>
    <div class="flex-1">
      <a href={twitterUrl} target="_blank" rel="noopener" aria-label="Twitter">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="#dd6b20"
          class="h-8 w-8 fill-current text-orange-600">
          <path
            d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z" /></svg>
      </a>
    </div>
    <div class="flex-1">
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener"
        aria-label="Facebook">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="h-8 w-8 fill-current text-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" /></svg>
        </svg></a>
    </div>
  </div>
  <div class="mt-2 px-6">
    <img
      class="h-24 sm:h-24 md:h-40 lg:h-40 xl:h-48 w-full rounded-lg shadow-md object-fill"
      src={headerUrl}
      alt={handleName} />
  </div>
{:else}
  <h3 class="font-montserrat px-6 py-4 text-orange-600 text-bold text-2xl">
    {titleArtist}
  </h3>
{/if}
<ReleaseGridAddress {txid} releasesByArtistStore={$releasesByArtistStore} />
{#if referralFans}
  <ReleaseGridFan {txid} myFansStore={$myFansStore} />
{/if}
