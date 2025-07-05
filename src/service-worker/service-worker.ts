import { STORAGE_KEY } from '../types';
import { makeBlacklist } from './blacklist';

// TODO: needs testing

// load data on startup
const blacklist = makeBlacklist();
start();

async function start() {
  const storage = await chrome.storage.sync.get(STORAGE_KEY);
  const entries = storage[STORAGE_KEY];
  blacklist.assign(entries);
}

// update blacklist on storage change
chrome.storage.onChanged.addListener((changes) => {
  if (changes[STORAGE_KEY]) {
    const entries = changes[STORAGE_KEY].newValue;
    blacklist.assign(entries);
  }
});

// watch for tabs
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    const url = changeInfo.url ?? tab.url ?? '';
    const shouldClose = blacklist.isIncluded(url);

    if (shouldClose) {
      const tabs = await chrome.tabs.query({ currentWindow: true });

      if (tabs.length === 1) {
        chrome.tabs.update({ url: 'chrome://new-tab-page' });
      } else {
        chrome.tabs.remove(tabId);
      }
    }
  }
});
