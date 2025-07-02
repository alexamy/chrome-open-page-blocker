import { afterEach, expect, it } from 'vitest';
import { screen } from 'shadow-dom-testing-library';
import { SiteRow } from './SiteRow';
import './SiteRow';

afterEach(() => {
  document.body.innerHTML = '';
});

it('renders', () => {
  const siteRow = document.createElement('site-row') as SiteRow;
  document.body.appendChild(siteRow);

  expect(screen.queryByShadowRole('button', { name: /−/ })).toBeInTheDocument();
  expect(screen.queryByShadowRole('textbox')).toBeInTheDocument();
  expect(screen.queryByShadowRole('checkbox')).toBeInTheDocument();
});
