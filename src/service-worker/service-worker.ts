import { SiteRowsDataEntry } from '../popup/elements/SiteRows';
import { STORAGE_KEY, type Message } from '../types';

// TODO: needs testing

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  request = request as Message;

  if (request.type === 'current-url') {
    processUrl(request.url);
  }

  return false;
});

async function processUrl(url: string) {
  const path = url.replace(/^https?\:\/\//, '').replace(/^www\./, '');

  const storage = await chrome.storage.sync.get(STORAGE_KEY);
  const entries: SiteRowsDataEntry[] = storage[STORAGE_KEY] ?? [];
  const shouldClose = entries.some(
    (entry) => entry.checked && path.startsWith(entry.value)
  );

  if (shouldClose) {
    closeCurrentTab();
  }
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
