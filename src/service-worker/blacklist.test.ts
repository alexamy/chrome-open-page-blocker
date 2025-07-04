import { expect, it } from 'vitest';
import { makeBlacklist } from './blacklist';

it('makes blacklist', () => {
  const list = makeBlacklist();

  expect(list.peek).toEqual([]);
});
it('reassign list', () => {});
it('peeks copy of the list', () => {});
it('reassigns the list', () => {});
it('remove protocol and www from url', () => {});
it('includes only checked entries with a value', () => {});
