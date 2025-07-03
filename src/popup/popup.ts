import './elements/SiteRow';
import './elements/SiteRows';
import { SiteRowsElement } from './elements/SiteRows';

const root = document.querySelector('site-rows') as SiteRowsElement;

root?.addEventListener('site-rows:data', (e) => console.log(e.detail));
