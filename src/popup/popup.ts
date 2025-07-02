import './SiteRow';
import './SiteRows';

const root = document.querySelector('site-rows');

// @ts-expect-error
root?.addEventListener('site-rows:data', (e) => console.log(e.detail));
