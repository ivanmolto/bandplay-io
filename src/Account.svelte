<script>
  import { arweave } from "./arweave.js";
  import Community from "community-js";
  import { activateAccount } from "./track.js";
  import { accountByAddress } from "./tracks.js";
  import { onMount } from "svelte";
  import { documentTitle } from "./helpers.js";
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
  let accountActivated = false;
  let accountSettings;
  let id = "";
  let apiVersion = "1";
  let status = "Published";
  let handleName = "";
  let facebookUrl = "";
  let twitterUrl = "";
  let websiteUrl = "";
  let contentType = "";
  let imageDataUrl = "";
  let headerUrl = "";
  let imageData = "";
  let pstRecipient;
  let pstFeeRecipient = 0.0002;
  function dataUrlToIntArray(dataUrl) {
    var byteString = atob(dataUrl.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return ia;
  }
  function handleAddHeader(error, fileItem) {
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
  const submitHeader = async (error, fileItem) => {
    handleAddHeader(error, fileItem);
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
      headerUrl = "https://arweave.net/" + txid;
    }
  };
  const submitAccount = async () => {
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
    const tx = await activateAccount(
      {
        id: id,
        handleName: handleName,
        headerUrl: headerUrl,
        author: address,
        websiteUrl: websiteUrl,
        facebookUrl: facebookUrl,
        twitterUrl: twitterUrl,
        status: status,
        apiVersion: apiVersion,
        content: " ",
      },
      wallet,
      address
    );
    window.location.href = `#/artist/${address}`;
  };
  onMount(async () => {
    accountSettings = await accountByAddress(address);
    if (accountSettings.length == 1) {
      accountActivated = true;
    }
    documentTitle("Account");
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

{#if accountActivated}
  <div class="py-6 antialiased text-gray-900 px-6">
    <div class="max-w-2xl mx-auto">
      <h1 class="content-center text-bold text-2xl w-full">Account Profile</h1>
      <div class="mt-4 content-center text-leading text-base w-full">
        You can customize your avatar
        <a
          class="hover:text-orange-500 text-orange-600"
          href="https://arca-arweave.github.io/arweave-id-v2-ui">here</a>
      </div>
    </div>
  </div>
{:else}
  <div class="py-6 antialiased text-gray-900 px-6">
    <form on:submit|preventDefault|once={submitAccount}>
      <div class="max-w-2xl mx-auto">
        <h1 class="content-center text-bold text-2xl w-full">
          Account Profile
        </h1>
        <div class="mt-4 content-center text-leading text-base w-full">
          You can customize your avatar
          <a
            class="hover:text-orange-500 text-orange-600"
            href="https://arca-arweave.github.io/arweave-id-v2-ui">here</a>
        </div>
        <div class="mt-2 content-center text-leading text-base w-full">
          (Optional) If your are an artist, band or label you can customize your
          header and spice your profile with your website and some social
          networks:
        </div>
        <div class="mt-4 flex flex-wrap -mx-6">
          <div class="w-1/2 px-6">
            <label class="block">
              <span class="text-gray-900">Handle name</span>
              <input
                type="text"
                name="handleName"
                class="form-input mt-1 block w-full text-gray-900 shadow
              bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none"
                required
                on:input={(event) => (handleName = event.target.value)} />
            </label>
            <label class="block mt-6">
              <span class="text-gray-900">Facebook URL</span>
              <input
                type="text"
                name="facebookUrl"
                class="form-input mt-1 block w-full text-gray-900 shadow
              bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none"
                required
                on:input={(event) => (facebookUrl = event.target.value)} />
            </label>
          </div>
          <div class="w-1/2 px-6">
            <label class="block">
              <span class="text-gray-900">Website URL</span>
              <input
                type="text"
                name="websiteUrl"
                class="form-input mt-1 block w-full text-gray-900 shadow
              bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none"
                required
                on:input={(event) => (websiteUrl = event.target.value)} />
            </label>
            <label class="block mt-6">
              <span class="text-gray-900">Twitter URL</span>
              <input
                type="text"
                name="twitterUrl"
                class="form-input mt-1 block w-full text-gray-900 shadow
              bg-gray-400 hover:border-gray-200 focus:bg-gray-300 border-none"
                required
                on:input={(event) => (twitterUrl = event.target.value)} />
            </label>
          </div>
        </div>
        <div class="block mt-6">
          <FilePond
            bind:this={pond}
            {name}
            allowFileSizeValidation={true}
            maxFileSize={700000}
            allowImageValidateSize={true}
            imageValidateSizeMinWidth={1280}
            imageValidateSizeMaxWidth={1280}
            imageValidateSizeMinHeight={180}
            imageValidateSizeMaxHeight={180}
            imageValidateSizeLabelExpectedMinSize={'Minimum size is {minWidth} × {minHeight}'}
            imageValidateSizeLabelExpectedMaxSize={'Maximum size is {maxWidth} × {maxHeight}'}
            acceptedFileTypes={['image/png', 'image/jpeg']}
            labelIdle={'Drag & Drop your cover track image or <span class="filepond--label-action"> Browse </span><br><i>- 1280 pixels wide, 180 pixels tall, .png or .jpg,  700KB max -</i>'}
            maxFiles={1}
            allowMultiple={false}
            oninit={handleInit}
            onaddfile={submitHeader}
            required={true} />
        </div>
        <div class="mt-4 py-4 sm:text-right">
          <button
            type="submit"
            aria-label="Publish"
            class="block w-full sm:w-auto sm:inline-block bg-orange-600
          hover:bg-orange-500 font-semibold text-white px-6 py-2 rounded-lg">
            Customize Profile
          </button>
        </div>
      </div>
    </form>
  </div>
{/if}
