import { type Message } from '../types';

console.log('Content script loaded!');

// Send the current URL to the background script
const url = window.location.href;
chrome.runtime.sendMessage({ type: 'current-url', url } satisfies Message);
console.log('Current URL:', url);
