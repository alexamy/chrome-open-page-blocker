import { afterEach, it } from 'vitest';
import './SiteRow';

afterEach(() => {
  document.body.innerHTML = '';
});

it('renders', () => {
  const siteRow = document.createElement('site-row');
  document.body.appendChild(siteRow);
});
