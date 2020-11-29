<script>
  import { onMount } from "svelte";
  import ReleaseGrid from "./ReleaseGrid.svelte";
  import { documentTitle } from "./helpers.js";
  import { releasesByApp } from "./releases.js";
  import { releasesStore } from "./stores.js";
  let tempReleases = [];
  let releases = [];
  onMount(async () => {
    tempReleases = await releasesByApp();
    for (let i = 0; i < tempReleases.length; i++) {
      let item = {
        id: tempReleases[i].id,
        timestamp: tempReleases[i].tags["Timestamp"],
        author: tempReleases[i].tags["Author"],
        artist: tempReleases[i].tags["Artist"],
        title: tempReleases[i].tags["Title"],
        genre: tempReleases[i].tags["Genre"],
        tgenre: tempReleases[i].tags["Tgenre"],
        imageUrl: tempReleases[i].tags["ImageUrl"],
        tip: tempReleases[i].tags["Tip"],
        payment: tempReleases[i].tags["Payment"],
        contractwallet: tempReleases[i].tags["Contract"],
        location: tempReleases[i].tags["Location"],
        badge: tempReleases[i].tags["Badge"],
        bootlegAvailable: tempReleases[i].tags["Bootleg"],
        license: tempReleases[i].tags["License"],
        playlist: JSON.parse(tempReleases[i].tags["Playlist"]),
        content: tempReleases[i].data,
      };
      releases.push(item);
    }
    releasesStore.set(releases);
    documentTitle();
  });
</script>

<ReleaseGrid releasesStore={$releasesStore} />
