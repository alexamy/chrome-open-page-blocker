import { STORAGE_KEY } from '../types';
import './elements/SiteRow';
import './elements/SiteRows';
import { SiteRowsDataEntry } from './elements/SiteRows';

start();

async function start() {
  const storage = await chrome.storage.sync.get(STORAGE_KEY);

  function saveNewData(entries: SiteRowsDataEntry[]) {
    chrome.storage.sync.set({
      [STORAGE_KEY]: entries,
    });
  }

  setup(storage, saveNewData);
}

function setup(
  storage: { [name: string]: any },
  onData: (entries: SiteRowsDataEntry[]) => void
) {
  const entries: SiteRowsDataEntry[] = storage[STORAGE_KEY] ?? [];
  const root = createRoot(entries);
  root.addEventListener('site-rows:data', (e) => onData(e.detail));
}

function createRoot(entries: SiteRowsDataEntry[]) {
  const root = document.createElement('site-rows');

  entries.forEach((entry) => {
    const element = document.createElement('site-row');
    element.setAttribute('checked', entry.checked.toString());
    element.append(entry.value);
    root.appendChild(element);
  });

  document.body.appendChild(root);

  return root;
}
