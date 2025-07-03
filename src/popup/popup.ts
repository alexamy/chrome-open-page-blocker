import { STORAGE_KEY } from '../types';
import './elements/SiteRow';
import './elements/SiteRows';
import { SiteRowsDataEntry } from './elements/SiteRows';

chrome.storage.sync.get(STORAGE_KEY).then(setup);

function setup(storage: { [name: string]: any }) {
  const entries: SiteRowsDataEntry[] = storage[STORAGE_KEY] ?? [];

  const root = createRoot(entries);
  document.body.appendChild(root);

  root.addEventListener('site-rows:data', (e) => {
    chrome.storage.sync.set({
      [STORAGE_KEY]: e.detail,
    });
  });
}

function createRoot(entries: SiteRowsDataEntry[]) {
  const root = document.createElement('site-rows');

  entries.forEach((entry) => {
    const element = document.createElement('site-row');
    element.setAttribute('checked', entry.checked.toString());
    element.append(entry.value);
    root.appendChild(element);
  });

  return root;
}
