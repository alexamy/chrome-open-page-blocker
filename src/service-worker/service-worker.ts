import { STORAGE_KEY } from '../types';
import { makeBlacklist } from './blacklist';

// TODO: needs testing

// load data on startup
const blacklist = makeBlacklist();
start();

async function start() {
  const storage = await chrome.storage.sync.get(STORAGE_KEY);
  const entries = storage[STORAGE_KEY];
  blacklist.reassign(entries);
}

// update blacklist on storage change
chrome.storage.onChanged.addListener((changes) => {
  if (changes[STORAGE_KEY]) {
    const entries = changes[STORAGE_KEY].newValue;
    blacklist.reassign(entries);
  }
});

// watch for tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    const url = changeInfo.url ?? tab.url ?? '';
    const shouldClose = blacklist.isIncluded(url);

    if (shouldClose) {
      chrome.tabs.remove(tabId);
    }
  }
});
