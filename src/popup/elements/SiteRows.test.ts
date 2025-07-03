import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen } from 'shadow-dom-testing-library';
import { SiteRowElement } from './SiteRow';
import './SiteRow';
import './SiteRows';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  document.body.innerHTML = '';
});

function setup(children: string[] = []) {
  const root = document.createElement('site-rows');

  const onData = vi.fn();
  root.addEventListener('site-rows:data', onData);

  children.forEach((text) => {
    const child = document.createElement('site-row') as SiteRowElement;
    child.append(text);

    root.appendChild(child);
  });

  document.body.appendChild(root);

  const add = screen.getByShadowRole('button', { name: /\+/ });

  return { root, children, add, onData };
}

it('renders', () => {
  const element = setup();

  expect(element.add).toBeInTheDocument();
});

it('renders with child elements', () => {
  const element = setup(['youtube.com', 'pinterest.com']);

  expect(screen.getByShadowText('youtube.com')).toBeInTheDocument();
  expect(screen.getByShadowText('pinterest.com')).toBeInTheDocument();
});

it('adds and focus new row when button is clicked', async () => {
  const element = setup();

  expect(screen.queryByShadowRole('textbox')).not.toBeInTheDocument();

  await userEvent.click(element.add);
  await userEvent.keyboard('facebook.com');

  // expect toHaveFocus is not working properly with shadow dom
  const input = screen.getByShadowRole('textbox') as HTMLInputElement;
  expect(input).toBeInTheDocument();
  expect(input.value).toBe('facebook.com');
});

describe('emits data', () => {
  it('when created', () => {
    const element = setup(['youtube.com']);

    expect(element.onData).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        detail: [{ checked: false, value: 'youtube.com' }],
      })
    );
  });

  it('when row is added', async () => {
    const element = setup(['youtube.com']);

    await userEvent.click(element.add);
    const input = screen.getAllByShadowRole('textbox')[1];
    await userEvent.type(input, 'pinterest.com');

    expect(element.onData).toHaveBeenLastCalledWith(
      expect.objectContaining({
        detail: [
          { checked: false, value: 'youtube.com' },
          { checked: false, value: 'pinterest.com' },
        ],
      })
    );
  });

  it('when row is removed', () => {});
  it('when row is checked', () => {});
  it('when row is changed', () => {});
});
