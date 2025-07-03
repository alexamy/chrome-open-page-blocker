import { SiteRowsDataEntry } from '../popup/elements/SiteRows';
import { type Message } from '../types';

// TODO: needs testing

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);
  request = request as Message;

  if (request.type === 'current-url') {
    const url = request.url as string;
    const path = url.replace(/^https?\:\/\//, '').replace(/^www\./, '');

    chrome.storage.sync.get('site-rows-storage').then((data) => {
      const entries: SiteRowsDataEntry[] = data['site-rows-storage'] ?? [];
      const shouldClose = entries.some(
        (entry) => entry.checked && path.startsWith(entry.value)
      );

      if (shouldClose) {
        closeCurrentTab();
      }
    });
  }

  return false;
});

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
