import { type Message } from '../types';

// Send the current URL to the background script
const url = window.location.href;
chrome.runtime.sendMessage({ type: 'current-url', url } satisfies Message);
