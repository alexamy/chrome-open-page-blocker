import { describe, expect, it, vi } from 'vitest';
import { screen } from 'shadow-dom-testing-library';
import { SiteRowElement } from './SiteRow';
import './SiteRow';
import './SiteRows';

function setup(children: SiteRowElement[] = []) {
  const root = document.createElement('site-rows');
  children.forEach((child) => root.appendChild(child));
  document.body.appendChild(root);

  const onData = vi.fn();
  root.addEventListener('site-rows:data', onData);

  return { root, children, onData };
}

it('renders with child elements', () => {
  const child1 = document.createElement('site-row') as SiteRowElement;
  child1.append('youtube.com');

  const child2 = document.createElement('site-row') as SiteRowElement;
  child2.append('pinterest.com');

  const element = setup([child1, child2]);

  expect(screen.getByShadowText('youtube.com')).toBeInTheDocument();
  expect(screen.getByShadowText('pinterest.com')).toBeInTheDocument();
});

it('adds and focus new row when button is clicked', () => {});

describe('emits data', () => {
  it('when created', () => {});
  it('when row is added', () => {});
  it('when row is removed', () => {});
  it('when row is checked', () => {});
  it('when row is changed', () => {});
});
