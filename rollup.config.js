/** @type {import('rollup').RollupOptions} */
export default {
  input: [
    'src/service-worker/service-worker.ts',
    'src/content/content.ts',
    'src/popup/popup.ts',
  ],
};
