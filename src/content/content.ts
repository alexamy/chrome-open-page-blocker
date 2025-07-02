console.log('Content script loaded!');

const url = window.location.href;
chrome.runtime.sendMessage({ type: 'current-url', url });
console.log('Current URL:', url);
