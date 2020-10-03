<script>
  import { onMount } from "svelte";
  import TrackGrid from "./TrackGrid.svelte";
  import { documentTitle } from "./helpers.js";
  import { tracksByApp } from "./tracks.js";
  import { tracksStore } from "./stores.js";
  let tempTracks = [];
  let tracks = [];
  onMount(async () => {
    tempTracks = await tracksByApp();
    for (let i = 0; i < tempTracks.length; i++) {
      let item = {
        id: tempTracks[i].id,
        title: tempTracks[i].tags["Title"],
        artist: tempTracks[i].tags["Artist"],
        imageUrl: tempTracks[i].tags["ImageUrl"],
        musicUrl: tempTracks[i].tags["MusicUrl"],
        location: tempTracks[i].tags["Location"],
        badge: tempTracks[i].tags["Badge"],
        author: tempTracks[i].tags["Author"],
        license: tempTracks[i].tags["License"],
        bootlegAvailable: tempTracks[i].tags["Bootleg"],
        tip: tempTracks[i].tags["Tip"],
        payment: tempTracks[i].tags["Payment"],
        contractwallet: tempTracks[i].tags["Contract"],
        genre: tempTracks[i].tags["Genre"],
        status: tempTracks[i].tags["Status"],
        apiVersion: tempTracks[i].tags["API"],
        timestamp: tempTracks[i].tags["Timestamp"],
        content: tempTracks[i].data,
      };
      tracks.push(item);
    }
    tracksStore.set(tracks);
    documentTitle();
  });
</script>

<TrackGrid tracksStore={$tracksStore} />
