import { afterEach, expect, it, vi } from 'vitest';
import { screen } from 'shadow-dom-testing-library';
import userEvent from '@testing-library/user-event';
import { SiteRow } from './SiteRow';
import './SiteRow';

afterEach(() => {
  document.body.innerHTML = '';
});

function setup() {
  const root = document.createElement('site-row') as SiteRow;
  document.body.appendChild(root);

  const text = screen.getByShadowRole('textbox') as HTMLInputElement;
  const checkbox = screen.getByShadowRole('checkbox') as HTMLInputElement;
  const remove = screen.getByShadowRole('button', {
    name: /−/,
  }) as HTMLButtonElement;

  return { root, text, checkbox, remove };
}

it('renders', () => {
  const element = setup();

  expect(element.checkbox).toBeInTheDocument();
  expect(element.text).toBeInTheDocument();
  expect(element.remove).toBeInTheDocument();
});

it('has checked property', () => {
  const element = setup();

  expect(element.checkbox.checked).toBe(true);
  expect(element.root.checked).toBe(true);

  element.root.checked = false;
  expect(element.checkbox.checked).toBe(false);
  expect(element.root.checked).toBe(false);
});

it('has value property', () => {
  const element = setup();
  expect(element.text.value).toBe('');
  expect(element.root.value).toBe('');

  element.root.value = 'hello';
  expect(element.text.value).toBe('hello');
  expect(element.root.value).toBe('hello');
});

it('has value of its text content', () => {
  const root = document.createElement('site-row') as SiteRow;
  root.append('hello');
  document.body.appendChild(root);

  expect(root.value).toBe('hello');
});

it('emits checked event', async () => {
  const element = setup();
  const fn = vi.fn();

  element.root.addEventListener('site-row:checked', fn);
  await userEvent.click(element.checkbox);

  expect(fn).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({
      detail: false,
    })
  );

  element.root.removeEventListener('site-row:checked', fn);
});

it('emits changed event', async () => {
  const element = setup();
  const fn = vi.fn();

  element.root.addEventListener('site-row:changed', fn);
  await userEvent.type(element.text, 'hi');

  expect(fn).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({
      detail: 'h',
    })
  );

  expect(fn).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({
      detail: 'hi',
    })
  );

  element.root.removeEventListener('site-row:changed', fn);
});

it('emits removed event', () => {});
