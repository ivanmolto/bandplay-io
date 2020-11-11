<script>
  import Header from "./Header.svelte";
  import Account from "./Account.svelte";
  import SearchFilters from "./SearchFilters.svelte";
  import Footer from "./Footer.svelte";
  import Home from "./Home.svelte";
  // import Track from "./Track.svelte";
  import Release from "./Release.svelte";
  import Releases from "./Releases.svelte";
  import Publish from "./Publish.svelte";
  import Pick from "./Pick.svelte";
  import Artist from "./Artist.svelte";
  import Library from "./Library.svelte";
  import { TX_PATTERN, TX_PICKS } from "./constants.js";
  import { onMount } from "svelte";
  let wallet = null;
  let address = null;
  let page = null;
  let txid = null;
  $: isLoggedIn = !!address;
  $: prevPage = null;
  const onAuth = (event) => {
    wallet = event.detail.wallet;
    address = event.detail.address;
  };
  async function hashchange() {
    const path = window.location.hash.slice(1);
    txid = null;
    prevPage = page;
    /* if (path.startsWith("/track")) {
      page = "track";
      txid = path.match(TX_PATTERN)[0];
    } else  */
    if (path.startsWith("/release")) {
      page = "release";
      txid = path.match(TX_PATTERN)[0];
    } else if (path.startsWith("/pick")) {
      page = "pick";
      txid = path.match(TX_PICKS)[0];
    } else if (path.startsWith("/artist")) {
      page = "artist";
      txid = path.match(TX_PATTERN)[0];
    } else if (path.startsWith("/account")) {
      if (isLoggedIn) {
        page = "account";
        txid = path.match(TX_PATTERN)[0];
      } else {
        page = "home";
        window.location.href = "#";
      }
    } else if (path.startsWith("/library")) {
      if (isLoggedIn) {
        page = "library";
        txid = path.match(TX_PATTERN)[0];
      } else {
        page = "home";
        window.location.href = "#";
      }
    } else if (path.startsWith("/publish")) {
      if (isLoggedIn) {
        page = "publish";
      } else {
        page = "home";
        window.location.href = "#";
      }
    } else {
      page = "home";
      window.location.href = "#";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  onMount(hashchange);
</script>

<svelte:window on:hashchange={hashchange} />
<div class="min-h-screen bg-gray-200 antialiased">
  <Header {isLoggedIn} on:auth={onAuth} {address} />
  {#if page === 'home'}
    <SearchFilters />
    <Home on:auth={onAuth} />
  {:else if page === 'publish'}
    <Publish {wallet} {address} />
  {:else if page === 'account'}
    <Account {wallet} {address} />
  {:else if page === 'pick'}
    <Pick {wallet} {address} {txid} />
  {:else if page === 'track'}
    <Track {wallet} {address} {prevPage} {txid} />
  {:else if page === 'release'}
    <Release {wallet} {address} {prevPage} {txid} />
  {:else if page === 'artist'}
    <Artist {txid} />
  {:else if page === 'library'}
    <Library {address} />
  {/if}
  <Footer />
</div>
