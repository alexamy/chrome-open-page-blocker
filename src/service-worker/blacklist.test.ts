import { expect, it } from 'vitest';
import { makeBlacklist } from './blacklist';

it('makes blacklist', () => {
  const list = makeBlacklist();

  expect(list.peek).toEqual([]);
});

it('assign list', () => {
  const list = makeBlacklist();
  list.assign([{ checked: true, value: 'site' }]);

  expect(list.peek).toEqual(['site']);
});

it('peeks copy of the list', () => {
  const list = makeBlacklist();
  list.assign([{ checked: true, value: 'site' }]);

  const peek = list.peek;
  expect(list.peek).toEqual(['site']);
  peek.push('new-entry');

  expect(list.peek).toEqual(['site']);
});

it('remove protocol and www from url', () => {
  const list = makeBlacklist();
  list.assign([{ checked: true, value: 'site' }]);
});

it('includes only checked entries with a value', () => {});
