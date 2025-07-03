import { SiteRowsDataEntry } from '../popup/elements/SiteRows';
import { STORAGE_KEY } from '../types';

// TODO: needs testing

start();

// first start
async function start() {
  const storage = await chrome.storage.sync.get(STORAGE_KEY);
  const entries: SiteRowsDataEntry[] = storage[STORAGE_KEY] ?? [];
  updateRules(entries);
}

// if storage is changed
chrome.storage.onChanged.addListener((changes) => {
  const entries: SiteRowsDataEntry[] = changes[STORAGE_KEY]?.newValue ?? [];
  updateRules(entries);
});

async function updateRules(entries: SiteRowsDataEntry[]) {
  const blocklist = getBlocklist(entries);

  // Get existing rules
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  const ruleIds = existingRules.map((rule) => rule.id);

  // Create new rules
  const newRules: chrome.declarativeNetRequest.Rule[] = blocklist.map(
    (site, index) => ({
      id: index + 1,
      priority: 1,
      action: { type: 'block' },
      condition: { urlFilter: `||${site}/` },
    })
  );

  // Update rules
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ruleIds,
    addRules: newRules,
  });
}

function getBlocklist(entries: SiteRowsDataEntry[]) {
  const filtered = entries
    .filter((entry) => entry.checked)
    .map((entry) => entry.value);

  return filtered;
}
