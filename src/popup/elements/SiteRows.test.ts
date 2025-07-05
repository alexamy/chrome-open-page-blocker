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

it('turns on checkbox when adding new rows', async () => {
  const element = setup();

  await userEvent.click(element.add);
  await userEvent.keyboard('facebook.com');

  const input = screen.getByShadowRole('checkbox') as HTMLInputElement;
  expect(input).toBeChecked();
});

it('removes row', async () => {
  const element = setup(['youtube.com']);

  const remove = screen.getByShadowRole('button', { name: /−/ });
  await userEvent.click(remove);

  expect(screen.queryByShadowText('youtube.com')).not.toBeInTheDocument();
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

    expect(element.onData).toHaveBeenLastCalledWith(
      expect.objectContaining({
        detail: [
          { checked: false, value: 'youtube.com' },
          { checked: false, value: '' },
        ],
      })
    );
  });

  it('when row is changed', async () => {
    const element = setup(['youtube.com']);

    await userEvent.click(element.add);
    await userEvent.keyboard('pinterest.com');

    expect(element.onData).toHaveBeenLastCalledWith(
      expect.objectContaining({
        detail: [
          { checked: false, value: 'youtube.com' },
          { checked: false, value: 'pinterest.com' },
        ],
      })
    );
  });

  it('when row is removed', async () => {
    const element = setup(['youtube.com']);

    await userEvent.click(element.add);
    await userEvent.keyboard('pinterest.com');

    const remove = screen.getAllByShadowRole('button', { name: /−/ })[0];
    await userEvent.click(remove);

    expect(element.onData).toHaveBeenLastCalledWith(
      expect.objectContaining({
        detail: [{ checked: false, value: 'pinterest.com' }],
      })
    );
  });

  it('when row is checked', async () => {
    const element = setup(['youtube.com']);

    const checkbox = screen.getByShadowRole('checkbox');
    await userEvent.click(checkbox);

    expect(element.onData).toHaveBeenLastCalledWith(
      expect.objectContaining({
        detail: [{ checked: true, value: 'youtube.com' }],
      })
    );
  });
});

// programmatically adding new rows with js
it.todo('allows appending new rows');
