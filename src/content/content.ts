import { type Message } from '../types';

// Send the current URL to the background script
chrome.runtime.sendMessage({
  type: 'current-url',
  url: window.location.href,
} satisfies Message);
