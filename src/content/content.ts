import { type Message } from '../types';

// Send the current URL to the background script
sendUrl((url) =>
  chrome.runtime.sendMessage({ type: 'current-url', url } satisfies Message)
);

export function sendUrl(onUrl: (url: string) => void) {
  onUrl(window.location.href);
}
