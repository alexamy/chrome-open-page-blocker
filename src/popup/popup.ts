import './elements/SiteRow';
import './elements/SiteRows';
import { SiteRowsDataEntry } from './elements/SiteRows';

chrome.storage.sync.get(['site-rows-storage']).then((data) => {
  const root = document.createElement('site-rows');
  const entries: SiteRowsDataEntry[] = data['site-rows-storage'];

  if (entries) {
    entries.forEach((entry) => {
      const element = document.createElement('site-row');
      element.setAttribute('checked', entry.checked.toString());
      element.append(entry.value);
      root.appendChild(element);
    });
  }

  document.body.appendChild(root);
  root.addEventListener('site-rows:data', (e) => {
    console.log('set!');
    chrome.storage.sync.set({
      'site-rows-storage': e.detail,
    });
  });
});
