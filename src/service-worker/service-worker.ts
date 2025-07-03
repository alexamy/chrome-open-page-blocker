import { SiteRowsDataEntry } from '../popup/elements/SiteRows';
import { STORAGE_KEY } from '../types';

// TODO: needs testing

// local blocklist
const block = prepareBlockList();

start();

// setup
async function start() {
  const storage = await chrome.storage.sync.get(STORAGE_KEY);
  const entries: SiteRowsDataEntry[] = storage[STORAGE_KEY] ?? [];
  block.reassign(entries);
}

// if storage is changed
chrome.storage.onChanged.addListener((changes, namespace) => {
  const entries: SiteRowsDataEntry[] = changes[STORAGE_KEY]?.newValue ?? [];
  block.reassign(entries);
});

// page web request
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = details.url;
    const path = url.replace(/^https?\:\/\//, '').replace(/^www\./, '');
    const result = block.list.has(path) ? { cancel: true } : {};

    return result;
  },
  { urls: ['<all_urls>'] },
  ['blocking']
);

function prepareBlockList() {
  let list = new Set();

  function reassign(entries: SiteRowsDataEntry[]) {
    const filtered = entries
      .filter((entry) => entry.checked)
      .map((entry) => entry.value);

    list = new Set(...filtered);
  }

  return {
    reassign,
    get list() {
      return list;
    },
  };
}
