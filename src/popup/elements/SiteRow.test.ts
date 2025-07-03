import { afterEach, expect, it, vi } from 'vitest';
import { screen } from 'shadow-dom-testing-library';
import userEvent from '@testing-library/user-event';
import { SiteRowElement } from './SiteRow';
import './SiteRow';

afterEach(() => {
  document.body.innerHTML = '';
});

function setup({ textChild = '' } = {}) {
  const root = document.createElement('site-row') as SiteRowElement;
  root.append(textChild);
  document.body.appendChild(root);

  const text = screen.getByShadowRole('textbox') as HTMLInputElement;
  const checkbox = screen.getByShadowRole('checkbox') as HTMLInputElement;
  const remove = screen.getByShadowRole('button', {
    name: /−/,
  }) as HTMLButtonElement;

  const onChange = vi.fn();
  root.addEventListener('site-row:changed', onChange);

  const onCheck = vi.fn();
  root.addEventListener('site-row:checked', onCheck);

  const onRemove = vi.fn();
  root.addEventListener('site-row:removed', onRemove);

  return { root, text, checkbox, remove, onCheck, onChange, onRemove };
}

it('renders', () => {
  const element = setup();

  expect(element.checkbox).toBeInTheDocument();
  expect(element.text).toBeInTheDocument();
  expect(element.remove).toBeInTheDocument();
});

it('uses checked attribute', () => {
  const root = document.createElement('site-row') as SiteRowElement;
  root.setAttribute('checked', 'true');
  document.body.appendChild(root);

  const checkbox = screen.getByShadowRole('checkbox') as HTMLInputElement;
  expect(checkbox.checked).toBe(true);
});

it('has checked property', () => {
  const element = setup();

  // default
  expect(element.checkbox.checked).toBe(false);
  expect(element.root.checked).toBe(false);

  // attribute
  element.root.setAttribute('checked', 'true');
  expect(element.checkbox.checked).toBe(true);
  expect(element.root.checked).toBe(true);

  // get set
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
  const element = setup({ textChild: 'hello' });

  expect(element.text.value).toBe('hello');
  expect(element.root.value).toBe('hello');
});

it('emits checked event', async () => {
  const element = setup();

  await userEvent.click(element.checkbox);

  expect(element.onCheck).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({
      detail: true,
    })
  );
});

it('emits changed event', async () => {
  const element = setup();

  await userEvent.type(element.text, 'hi');

  expect(element.onChange).toBeCalledTimes(2);

  expect(element.onChange).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({
      detail: 'h',
    })
  );

  expect(element.onChange).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({
      detail: 'hi',
    })
  );
});

it('emits removed event', async () => {
  const element = setup();

  await userEvent.click(element.remove);

  expect(element.onRemove).toHaveBeenCalledOnce();
});

it('has checked attribute', () => {});
