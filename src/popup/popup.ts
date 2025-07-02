import './SiteRow';
import './SiteRows';
import { SiteRows } from './SiteRows';

const root = document.querySelector('site-rows') as SiteRows;

root?.addEventListener('site-rows:data', (e) => console.log(e.detail));
