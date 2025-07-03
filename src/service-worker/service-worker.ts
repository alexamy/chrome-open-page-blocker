import { SiteRowsDataEntry } from '../popup/elements/SiteRows';
import { STORAGE_KEY, type Message } from '../types';

// TODO: needs testing

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  request = request as Message;

  if (request.type === 'current-url') {
    const url = request.url as string;
    const path = getPath(url);

    chrome.storage.sync.get(STORAGE_KEY).then((data) => {
      const entries: SiteRowsDataEntry[] = data[STORAGE_KEY] ?? [];
      if (isFromEntries(path, entries)) {
        closeCurrentTab();
      }
    });
  }

  return false;
});

function getPath(url: string) {
  return url.replace(/^https?\:\/\//, '').replace(/^www\./, '');
}

function isFromEntries(path: string, entries: SiteRowsDataEntry[]) {
  return entries.some((entry) => entry.checked && path.startsWith(entry.value));
}

function closeCurrentTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const activeTab = tabs[0];

      if (activeTab.id) {
        chrome.tabs.remove(activeTab.id);
      }
    } else {
      console.warn('No active tab found.');
    }
  });
}
