import './elements/SiteRow';
import './elements/SiteRows';
import { SiteRowsDataEntry, SiteRowsElement } from './elements/SiteRows';

const root = document.querySelector('site-rows') as SiteRowsElement;

if (!root) {
  throw new Error('Site rows root element is not found!');
}

root.addEventListener('site-rows:data', (e) => {
  console.log('set!');
  chrome.storage.sync.set({
    'site-rows-storage': e.detail,
  });
});

chrome.storage.sync.get(['site-rows-storage']).then((data) => {
  console.log('get!', data);
  const entries = data['site-rows-storage'] as SiteRowsDataEntry[];
  if (entries) {
    entries.forEach((entry) => {
      const element = document.createElement('site-row');
      element.setAttribute('checked', entry.checked.toString());
      element.append(entry.value);
      root.appendChild(element);
    });
  }
});
