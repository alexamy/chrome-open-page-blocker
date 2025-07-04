import { SiteRowsDataEntry } from '../popup/elements/SiteRows';
import { STORAGE_KEY } from '../types';

// TODO: needs testing
const blacklist = makeBlacklist();

// load data on startup
blacklist.reload();

// update blacklist on storage change
chrome.storage.onChanged.addListener((changes) => {
  blacklist.reassign(changes);
});

// watch for tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    const shouldClose = blacklist.isIncluded(changeInfo.url || '');

    if (shouldClose) {
      chrome.tabs.remove(tabId);
    }
  }
});

// make blacklist constructor
function makeBlacklist() {
  let blacklist: string[] = [];

  async function reload() {
    const storage = await chrome.storage.sync.get(STORAGE_KEY);
    reassign(storage);
  }

  function reassign(storage: { [name: string]: any }) {
    const entries: SiteRowsDataEntry[] = storage[STORAGE_KEY] ?? [];
    const list = entries
      .filter((entry) => entry.checked)
      .map((entry) => entry.value);

    blacklist = list;
  }

  function isIncluded(url: string) {
    const path = (url || '').replace(/^https?\:\/\//, '').replace(/^www\./, '');
    const isIncluded = blacklist.some((entry) => path.startsWith(entry));

    return isIncluded;
  }

  return {
    reload,
    reassign,
    isIncluded,
  };
}
