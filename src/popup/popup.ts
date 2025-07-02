import './elements/SiteRow';
import './elements/SiteRows';
import { SiteRows } from './elements/SiteRows';

const root = document.querySelector('site-rows') as SiteRows;

root?.addEventListener('site-rows:data', (e) => console.log(e.detail));
