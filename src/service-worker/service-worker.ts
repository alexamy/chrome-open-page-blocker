console.log('Service worker loaded!');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);

  if (request.type === 'current-url') {
    const url = request.url;
    console.log('Received URL from content script:', url);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTab = tabs[0];
        console.log('Active tab:', activeTab);

        if (activeTab.id) {
          chrome.tabs.remove(activeTab.id);
        }
      } else {
        console.warn('No active tab found.');
      }
    });
  }

  return false;
});
