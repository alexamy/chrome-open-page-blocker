import { SiteRowsDataEntry } from '../popup/elements/SiteRows';

// make blacklist constructor
export function makeBlacklist() {
  let blacklist: string[] = [];

  function assign(entries: SiteRowsDataEntry[] = []) {
    const list = entries
      .filter((entry) => entry.checked && entry.value)
      .map((entry) => entry.value);

    blacklist = list;
  }

  function isIncluded(url: string = '') {
    const path = url.replace(/^https?\:\/\//, '').replace(/^www\./, '');
    const isIncluded = blacklist.some((entry) => path.startsWith(entry));

    return isIncluded;
  }

  return {
    assign,
    isIncluded,
    get peek() {
      return Array.from(blacklist);
    },
  };
}
