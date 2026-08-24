import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';
import { defineConfig } from '@lynx-js/rspeedy';

import { pluginLynxBundleAnalysisStats } from '../bundle-analysis-stats.plugin.js';

export default defineConfig({
  source: {
    entry: {
      baseline: './src/benchmark/Baseline.tsx',
      workaround: './src/benchmark/Workaround.tsx',
      object: './src/benchmark/Object.tsx',
    },
  },
  plugins: [pluginReactLynx(), pluginLynxBundleAnalysisStats()],
  environments: {
    lynx: {},
  },
});
