import { afterEach, expect, it } from 'vitest';
import { screen } from '@testing-library/dom';
import { SiteRow } from './SiteRow';
import './SiteRow';

afterEach(() => {
  document.body.innerHTML = '';
});

it('renders', () => {
  const siteRow = document.createElement('site-row') as SiteRow;
  document.body.appendChild(siteRow);

  expect(screen.queryByRole('button', { name: /−/ })).toBeTruthy();
  expect(screen.queryByRole('textbox')).toBeTruthy();
  expect(screen.queryByRole('checkbox')).toBeTruthy();
});
