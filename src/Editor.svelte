<script>
  import { arweave } from "./arweave.js";
  import Community from "community-js";
  import { publish } from "./track.js";
  import { onMount } from "svelte";
  import { documentTitle } from "./helpers.js";
  import { quill } from "svelte-quill";
  import {
    editGenres,
    editLocations,
    editBadges,
    editLicenses,
    editBootlegs,
    editTips,
    editPayments,
  } from "./populate.js";
  import { CONTRACTID } from "./constants.js";
  import FilePond, { registerPlugin, supported } from "svelte-filepond";
  import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
  import FilePondPluginImagePreview from "filepond-plugin-image-preview";
  import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
  import FilePondPluginFileEncode from "filepond-plugin-file-encode";
  import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
  import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
  export let wallet;
  export let address;
  let enablePreview = false;
  let options = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block", "link", "image", "video"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    },
    placeholder: "Start to write about your track...",
    theme: "snow",
  };
  let trackContent = {
    html: "More info about your track",
    text: "More info about your track",
  };
  let genreEdited;
  let locationEdited;
  let badgeEdited;
  let licenseEdited;
  let bootlegEdited;
  let tipEdited;
  let paymentEdited;
  let pstRecipient;
  let pstFeeSubmissionRecipient = 0.0;
  let pstFeeRecipient = 0.002;
  let pstFeaturedPremium = 2.0;
  function handleEditedGenre() {
    genre = genreEdited.text;
  }
  function handleEditedLocation() {
    location = locationEdited.text;
  }
  function handleEditedBadge() {
    badge = badgeEdited.text;
  }
  function handleEditedLicense() {
    license = licenseEdited.text;
  }
  function handleEditedBootleg() {
    bootlegAvailable = bootlegEdited.text;
  }
  function handleEditedTip() {
    tip = tipEdited.text;
  }
  function handleEditedPayment() {
    payment = paymentEdited.text;
  }
  let id = "";
  let imageUrl = "";
  let musicData = "";
  let imageData = "";
  let musicUrl = "";
  let title = "";
  let artist = "";
  let payment = "Wallet";
  let contractwallet = "";
  let genre = "Acoustic";
  let location = "Africa";
  let badge = "New";
  let bootlegAvailable = "Accepted";
  let tip = "0.25";
  let license = "All rights reserved";
  let status = "Published";
  let apiVersion = "1";
  let contentType = "";
  let musicDataUrl = "";
  let imageDataUrl = "";
  function dataUrlToIntArray(dataUrl) {
    var byteString = atob(dataUrl.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return ia;
  }
  function handleAddMusic(error, fileItem) {
    contentType = fileItem.fileExtension;
    if (contentType == "mp3") {
      contentType = "audio/mpeg";
    } else {
      contentType = "audio/wav";
    }
    musicDataUrl = fileItem.getFileEncodeDataURL();
    musicData = dataUrlToIntArray(musicDataUrl);
    if (fileItem) {
    }
  }
  function handleAddImage(error, fileItem) {
    contentType = fileItem.fileExtension;
    if (contentType == "png") {
      contentType = "image/png";
    } else {
      contentType = "image/jpeg";
    }
    imageDataUrl = fileItem.getFileEncodeDataURL();
    imageData = dataUrlToIntArray(imageDataUrl);
    if (fileItem) {
    }
  }
  const submitAudio = async (error, fileItem) => {
    handleAddMusic(error, fileItem);
    if (!wallet || !address) {
      return;
    }
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
    const tx = await arweave.createTransaction({ data: musicData }, wallet);
    tx.addTag("Content-Type", contentType);
    await arweave.transactions.sign(tx, wallet);
    const txid = tx.id;
    const res = await arweave.transactions.post(tx);
    if (res.status === 200 || res.status === 202) {
      musicUrl = "https://arweave.net/" + txid;
    }
  };
  const submitCover = async (error, fileItem) => {
    handleAddImage(error, fileItem);
    if (!wallet || !address) {
      return;
    }
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
    const tx = await arweave.createTransaction({ data: imageData }, wallet);
    tx.addTag("Content-Type", contentType);
    await arweave.transactions.sign(tx, wallet);
    const txid = tx.id;
    const res = await arweave.transactions.post(tx);
    if (res.status === 200 || res.status === 202) {
      imageUrl = "https://arweave.net/" + txid;
    }
  };
  const submitTrack = async () => {
    if (!wallet || !address) {
      return;
    }
    const client = new Arweave({
      host: "arweave.dev",
      port: 443,
      protocol: "https",
      timeout: 200000,
    });
    if (badge == "Featured") {
      pstFeeSubmissionRecipient = pstFeeRecipient + pstFeaturedPremium;
    }
    let community = new Community(client);
    await community.setCommunityTx(CONTRACTID);
    pstRecipient = await community.selectWeightedHolder();
    let pstTx = await arweave.createTransaction(
      {
        target: pstRecipient,
        quantity: arweave.ar.arToWinston(pstFeeSubmissionRecipient),
      },
      wallet
    );
    await arweave.transactions.sign(pstTx, wallet);
    await arweave.transactions.post(pstTx);
    handleEditedGenre();
    handleEditedLocation();
    handleEditedBadge();
    handleEditedLicense();
    handleEditedBootleg();
    handleEditedTip();
    handleEditedPayment();
    const tx = await publish(
      {
        id: id,
        imageUrl: imageUrl,
        musicUrl: musicUrl,
        title: title,
        author: address,
        artist: artist,
        genre: genre,
        location: location,
        badge: badge,
        license: license,
        bootlegAvailable: bootlegAvailable,
        tip: tip,
        payment: payment,
        contractwallet: contractwallet,
        status: status,
        apiVersion: apiVersion,
        content: trackContent.html,
      },
      wallet,
      address
    );
    window.location.href = `#/track/${tx.id}`;
  };
  onMount(() => {
    documentTitle("Editor");
  });
  registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginFileEncode,
    FilePondPluginFileValidateSize,
    FilePondPluginImageValidateSize
  );
  let pond;
  let name = "filepond";
  function handleInit() {}
</script>

<style>
  .editor {
    font-size: 1rem;
  }
</style>

<svelte:head>
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>
<div class="py-6 antialiased text-gray-900 px-6">
  <div class="max-w-2xl mx-auto">
    <h1 class="content-center text-bold text-2xl w-full">List Your Track</h1>
    <form on:submit|preventDefault|once={submitTrack}>
      <div class="block mt-6">
        <FilePond
          bind:this={pond}
          {name}
          allowFileSizeValidation={true}
          maxFileSize={200000000}
          acceptedFileTypes={['audio/mpeg', 'audio/wav']}
          labelIdle={'Drag & Drop your music track or <span class="filepond--label-action"> Browse </span><br><i>- .mp3 or .wav, 200MB max -</i>'}
          maxFiles={1}
          allowMultiple={false}
          oninit={handleInit}
          onaddfile={submitAudio}
          required={true} />
      </div>
      <div class="block mt-6">
        <FilePond
          bind:this={pond}
          {name}
          allowFileSizeValidation={true}
          maxFileSize={200000}
          allowImageValidateSize={true}
          imageValidateSizeMinWidth={512}
          imageValidateSizeMaxWidth={512}
          imageValidateSizeMinHeight={512}
          imageValidateSizeMaxHeight={512}
          imageValidateSizeLabelExpectedMinSize={'Minimum size is {minWidth} × {minHeight}'}
          imageValidateSizeLabelExpectedMaxSize={'Maximum size is {maxWidth} × {maxHeight}'}
          acceptedFileTypes={['image/png', 'image/jpeg']}
          labelIdle={'Drag & Drop your art cover or <span class="filepond--label-action"> Browse </span><br><i>- 512 pixels wide, 512 pixels tall, .png or .jpg,  200KB max -</i>'}
          maxFiles={1}
          allowMultiple={false}
          oninit={handleInit}
          onaddfile={submitCover}
          required={true} />
      </div>
      <div class="mt-4 flex flex-wrap -mx-6">
        <div class="w-1/2 px-6">
          <label class="block">
            <span class="text-gray-900">Title</span>
            <input
              type="text"
              name="title"
              class="form-input mt-1 block w-full text-gray-900 shadow
                bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none"
              required
              on:input={(event) => (title = event.target.value)} />
          </label>
          <label class="block mt-4" for="badge">
            <span class="text-gray-900">Badge</span>
            <div class="sm:flex lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none"
                name="pricing"
                bind:value={badgeEdited}
                on:blur={handleEditedBadge}>
                {#each editBadges as editBadge}
                  <option value={editBadge}>{editBadge.text}</option>
                {/each}
              </select>
            </div>
          </label>
          <label class="block mt-4" for="tipping">
            <span class="text-gray-900">Tip (AR)</span>
            <div class="sm:flex lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none"
                name="pricing"
                bind:value={tipEdited}
                on:blur={handleEditedTip}>
                {#each editTips as editTip}
                  <option value={editTip}>{editTip.text}</option>
                {/each}
              </select>
            </div>
          </label>
          <label class="block mt-4" for="payment">
            <span class="text-gray-900">Payment method</span>
            <div class="sm:flex lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none"
                name="license"
                bind:value={paymentEdited}
                on:blur={handleEditedPayment}>
                {#each editPayments as editPayment}
                  <option value={editPayment}>{editPayment.text}</option>
                {/each}
              </select>
            </div>
          </label>
          <label class="block mt-4">
            <span class="text-gray-900">Wallet / PSC</span>
            <input
              type="text"
              name="contractwallet"
              class="form-input mt-1 block w-full text-gray-900 shadow
                bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none"
              required
              on:input={(event) => (contractwallet = event.target.value)} />
          </label>
        </div>
        <div class="w-1/2 px-6">
          <label class="block">
            <span class="text-gray-900">Artist</span>
            <input
              type="text"
              name="artist"
              class="form-input mt-1 block w-full text-gray-900 shadow
                bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none"
              required
              on:input={(event) => (artist = event.target.value)} />
          </label>
          <label class="block mt-4" for="genre">
            <span class="text-gray-900">Genre</span>
            <div class="sm:flex lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none mr-2"
                name="genre"
                bind:value={genreEdited}
                on:blur={handleEditedGenre}>
                {#each editGenres as editGenre}
                  <option value={editGenre}>{editGenre.text}</option>
                {/each}
              </select>
            </div>
          </label>
          <label class="block mt-4" for="location">
            <span class="text-gray-900">Location</span>
            <div class="sm:flex lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none mr-2"
                name="location"
                bind:value={locationEdited}
                on:blur={handleEditedLocation}>
                {#each editLocations as editLocation}
                  <option value={editLocation}>{editLocation.text}</option>
                {/each}
              </select>
            </div>
          </label>
          <label class="block mt-4" for="license">
            <span class="text-gray-900">License</span>
            <div class="sm:flex lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none"
                name="license"
                bind:value={licenseEdited}
                on:blur={handleEditedLicense}>
                {#each editLicenses as editLicense}
                  <option value={editLicense}>{editLicense.text}</option>
                {/each}
              </select>
            </div>
          </label>
          <label class="block mt-4" for="bootleg">
            <span class="text-gray-900">Bootlegs</span>
            <div class="sm:flex lg:block lg:mx-0">
              <select
                class="mt-1 form-select block w-full text-gray-900 shadow
                  bg-gray-400 hover:border-gray-200 focus:bg-gray-300
                  border-none"
                name="bootlegs"
                bind:value={bootlegEdited}
                on:blur={handleEditedBootleg}>
                {#each editBootlegs as editBootleg}
                  <option value={editBootleg}>{editBootleg.text}</option>
                {/each}
              </select>
            </div>
          </label>
        </div>
      </div>
      <div class="block mt-4">
        <span class="text-gray-900">Rich Text Editor</span>
      </div>
      <div
        class="mt-2 block w-full text-2xl text-gray-900 shadow bg-gray-400
          hover:border-gray-200 focus:bg-gray-300 border-none">
        <div
          class="editor"
          use:quill={options}
          on:text-change={(e) => (trackContent = e.detail)} />
        <br />
      </div>
      <div>
        <label class="flex">
          <input
            class="mt-3 form-checkbox h-5 w-5 block text-gray-900 bg-gray-400
              hover:border-gray-200 focus:bg-gray-300 border-none"
            type="checkbox"
            name="preview"
            bind:checked={enablePreview} />
          <span class="ml-2 mt-3">Enable Preview HTML</span>
        </label>
        {#if enablePreview}
          <div class="prose">
            {@html trackContent.html}
          </div>
        {/if}
      </div>
      <div class="mt-4 py-4 sm:text-right">
        <button
          type="submit"
          aria-label="Publish"
          class="block w-full sm:w-auto sm:inline-block bg-orange-600
            hover:bg-orange-500 font-semibold text-white px-6 py-2 rounded-lg">
          Publish
        </button>
      </div>
    </form>
  </div>
</div>
