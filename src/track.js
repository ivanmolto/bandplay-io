import {arweave} from "./arweave.js";
import {APP_NAME_TRACKS} from "./constants.js"; 
export const publishTrack = async (props, wallet, address) => {
  const timestamp = Math.round((new Date()).getTime() / 1000);
  const title = props.title;
  const musicUrl = props.musicUrl;
  const genre = props.genre;
  const owner = address;
  const content = title;
  let tx = await arweave.createTransaction(
    {
      data: content,
    },
    wallet
  );
  tx['last_tx'] = await arweave.api.get('/tx_anchor').then(x => x.data);
  tx.addTag('Content-Type', 'text/html');
  const tags = {
    'App-Name': APP_NAME_TRACKS + owner,
    'Owner': owner,
    'Timestamp': timestamp,
    'Title': title,
    'MusicUrl': musicUrl,
    'Genre': genre
  };
  for (const [tagKey, tagValue] of Object.entries(tags)) {
    tx.addTag(tagKey, tagValue);
  }
  await arweave.transactions.sign(tx, wallet);
  let uploader = await arweave.transactions.getUploader(tx);
  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(`complete`);
  }
  const clone = {...tx};
  clone['tags'] = tags;
  clone['data'] = content;
  clone['owner'] = address;
  window.localStorage.setItem(clone.id, JSON.stringify(clone));
  return clone;
};
