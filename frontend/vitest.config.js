/// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Ensure that the test environment is jsdom
    globals: true, // Ensures that `expect` is globally available
    setupFiles: './src/tests/setupTests.js', // Correct path to your setup file

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['**/*.test.{js,ts,jsx,tsx}', 'node_modules'],
    },
  },
});
