import {arweave, txTags, txOwner, txData} from "./arweave.js";
import {APP_NAME,APP_NAME_ACCOUNTS} from "./constants.js";
export const read = async txid => {
  let tx = window.localStorage.getItem(txid);
  if (tx) {
     return JSON.parse(tx);
  }
  tx = await arweave.transactions.get(txid);
  const clone = {...tx};
  clone['tags'] = txTags(tx);
  clone['data'] = await txData(tx);
  clone['owner'] = await txOwner(tx);
  window.localStorage.setItem(clone.id, JSON.stringify(clone));
  return clone;
};
export const publish = async (props, wallet, address) => {
  const title = props.title;
  const artist = props.artist;
  const imageUrl = props.imageUrl;
  const musicUrl = props.musicUrl;
  const location = props.location;
  const badge = props.badge;
  const author = props.author;
  const license = props.license;
  const bootlegAvailable = props.bootlegAvailable;
  const tip = props.tip;
  const payment = props.payment;
  const contractwallet = props.contractwallet;
  const genre = props.genre;
  const status = props.status;
  const apiVersion = props.apiVersion;
  const content = props.content;
  const timestamp = Math.round((new Date()).getTime() / 1000);
  const id = author + timestamp;
  let tx = await arweave.createTransaction(
    {
      data: content,
    },
    wallet
  );
  tx['last_tx'] = await arweave.api.get('/tx_anchor').then(x => x.data);
  tx.addTag('Content-Type', 'text/html');
  const tags = {
    'App-Name': APP_NAME,
    'Id': id,
    'Title': title,
    'ImageUrl': imageUrl,
    'MusicUrl': musicUrl,
    'Location': location,
    'Badge': badge,
    'Artist': artist,
    'Author': author,
    'License': license,
    'Bootleg': bootlegAvailable,
    'Tip': tip,
    'Payment': payment,
    'Contract': contractwallet,
    'Genre': genre,
    'Status': status,
    'API': apiVersion,
    'Timestamp': timestamp
  };
  for (const [tagKey, tagValue] of Object.entries(tags)) {
    tx.addTag(tagKey, tagValue);
  }
  await arweave.transactions.sign(tx, wallet);
  let uploader = await arweave.transactions.getUploader(tx);
  while (!uploader.isComplete) {
    await uploader.uploadChunk();
  }
  const clone = {...tx};
  clone['tags'] = tags;
  clone['data'] = content;
  clone['owner'] = address;
  window.localStorage.setItem(clone.id, JSON.stringify(clone));
  return clone;
};
export const activateAccount = async (props, wallet, address) => {
  const id = props.id;
  const handleName = props.handleName;
  const author = props.author;
  const headerUrl = props.headerUrl;
  const websiteUrl = props.websiteUrl;
  const facebookUrl = props.facebookUrl;
  const twitterUrl = props.twitterUrl;
  const status = props.status;
  const apiVersion = props.apiVersion;
  const content = props.content;
  const timestamp = Math.round((new Date()).getTime() / 1000);
  let tx = await arweave.createTransaction(
    {
      data: content,
    },
    wallet
  );
  tx.addTag('Content-Type', 'text/html');
  const tags = {
    'App-Name': APP_NAME_ACCOUNTS,
    'Id': author + timestamp,
    'HandleName': handleName,
    'Author': author,
    'HeaderUrl': headerUrl,
    'WebsiteUrl': websiteUrl,
    'FacebookUrl': facebookUrl,
    'TwitterUrl': twitterUrl,
    'API': apiVersion,
    'Status': status,
    'Timestamp': timestamp
  };
  for (const [tagKey, tagValue] of Object.entries(tags)) {
    tx.addTag(tagKey, tagValue);
  }
  await arweave.transactions.sign(tx, wallet);
  let uploader = await arweave.transactions.getUploader(tx);
  while (!uploader.isComplete) {
    await uploader.uploadChunk();
  }
  const clone = {...tx};
  clone['tags'] = tags;
  clone['data'] = content;
  clone['owner'] = address;
  window.localStorage.setItem(clone.id, JSON.stringify(clone));
  return clone;
};
