console.log('Service worker loaded!');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message in popup:', request);

  if (request.type === 'current-url') {
    const url = request.url;
    console.log('Received URL from content script:', url);
  }

  return false;
});
