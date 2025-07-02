import { afterEach, expect, it } from 'vitest';
import { screen } from 'shadow-dom-testing-library';
import { SiteRow } from './SiteRow';
import './SiteRow';

afterEach(() => {
  document.body.innerHTML = '';
});

function setup() {
  const root = document.createElement('site-row') as SiteRow;
  document.body.appendChild(root);

  const text = screen.getByShadowRole('textbox');
  const checkbox = screen.getByShadowRole('checkbox');
  const remove = screen.getByShadowRole('button', { name: /−/ });

  return { root, text, checkbox, remove };
}

it('renders', () => {
  const element = setup();

  expect(element.checkbox).toBeInTheDocument();
  expect(element.text).toBeInTheDocument();
  expect(element.remove).toBeInTheDocument();
});

it('has checked property', () => {});

it('has value property', () => {});

it('emits checked event', () => {});
it('emits changed event', () => {});
it('emits removed event', () => {});
