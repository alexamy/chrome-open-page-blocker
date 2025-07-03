import { describe, it, vi } from 'vitest';
import { SiteRowElement } from './SiteRow';

function setup(children: SiteRowElement[] = []) {
  const root = document.createElement('site-rows');
  children.forEach((child) => root.appendChild(child));
  document.body.appendChild(root);

  const onData = vi.fn();
  root.addEventListener('site-rows:data', onData);

  return { root, children, onData };
}

it('renders with child elements', () => {});

it('adds and focus new row when button is clicked', () => {});

describe('emits data', () => {
  it('when created', () => {});
  it('when row is added', () => {});
  it('when row is removed', () => {});
  it('when row is checked', () => {});
  it('when row is changed', () => {});
});
