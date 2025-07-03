import './elements/SiteRow';
import './elements/SiteRows';
import { SiteRowsElement } from './elements/SiteRows';

const root = document.querySelector('site-rows') as SiteRowsElement;

if (!root) {
  throw new Error('Site rows root element is not found!');
}

root.addEventListener('site-rows:data', (e) => console.log(e.detail));
