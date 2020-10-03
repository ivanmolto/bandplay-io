<script>
  import TrackGridLibrary from "./TrackGridLibrary.svelte";
  import { myTipsStore } from "./stores.js";
  import { TIPS_FAN } from "./constants";
  import { onMount } from "svelte";
  import { myTracksTipped } from "./tracks.js";
  import { documentTitle } from "./helpers.js";
  export let address;
  const tipTag = TIPS_FAN + address;
  let tracksFan = [];
  let tracksAddress = [];
  onMount(async () => {
    tracksAddress = await myTracksTipped(tipTag);
    for (let i = 0; i < tracksAddress.length; i++) {
      let item = {
        id: tracksAddress[i].id,
        track: tracksAddress[i].tags["Track"],
        title: tracksAddress[i].tags["Title"],
        artist: tracksAddress[i].tags["Artist"],
        genre: tracksAddress[i].tags["Genre"],
        imageUrl: tracksAddress[i].tags["ImageUrl"],
        musicUrl: tracksAddress[i].tags["MusicUrl"],
      };
      tracksFan.push(item);
    }
    myTipsStore.set(tracksFan);
    documentTitle("My Library");
  });
</script>

<TrackGridLibrary myTipsStore={$myTipsStore} />
