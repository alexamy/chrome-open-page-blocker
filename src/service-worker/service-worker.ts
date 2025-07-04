import { SiteRowsDataEntry } from '../popup/elements/SiteRows';
import { STORAGE_KEY } from '../types';

// TODO: needs testing

start();

// setup
async function start() {
  const storage = await chrome.storage.sync.get(STORAGE_KEY);
  const entries: SiteRowsDataEntry[] = storage[STORAGE_KEY] ?? [];
  const blacklist = entries
    .filter((entry) => entry.checked)
    .map((entry) => entry.value);

  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'loading') {
      const path = (changeInfo.url || '')
        .replace(/^https?\:\/\//, '')
        .replace(/^www\./, '');

      const shouldClose = blacklist.some((entry) => path.startsWith(entry));

      if (shouldClose) {
        chrome.tabs.remove(tabId);
      }
    }
  });
}
