import { defineConfig, mergeConfig } from 'vitest/config'

import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react(), svgr()],
})

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
  }
}));
