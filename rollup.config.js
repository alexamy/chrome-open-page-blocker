import typescript from '@rollup/plugin-typescript';

/** @type {import('rollup').RollupOptions} */
export default {
  plugins: [typescript()],
  input: [
    'src/service-worker/service-worker.ts',
    'src/content/content.ts',
    'src/popup/popup.ts',
  ],
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
};
