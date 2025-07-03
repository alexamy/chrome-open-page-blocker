import { SiteRowsDataEntry } from '../popup/elements/SiteRows';
import { STORAGE_KEY, type Message } from '../types';

// TODO: needs testing

// local blocklist
let blocklist = new Set();

start();

// setup
async function start() {
  const storage = await chrome.storage.sync.get(STORAGE_KEY);
  const entries: SiteRowsDataEntry[] = storage[STORAGE_KEY] ?? [];
  blocklist = makeBlockList(entries);
}

// if storage is changed
chrome.storage.onChanged.addListener((changes, namespace) => {
  const entries: SiteRowsDataEntry[] = changes[STORAGE_KEY]?.newValue ?? [];
  blocklist = makeBlockList(entries);
});

// page web request
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = details.url;
    const path = url.replace(/^https?\:\/\//, '').replace(/^www\./, '');
    const result = blocklist.has(path) ? { cancel: true } : {};

    return result;
  },
  { urls: ['<all_urls>'] },
  ['blocking']
);

// transform site rows to blocklist
function makeBlockList(entries: SiteRowsDataEntry[]): Set<string> {
  const list = entries
    .filter((entry) => entry.checked)
    .map((entry) => entry.value);

  return new Set(...list);
}
