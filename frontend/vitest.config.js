import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Automatically makes expect, describe, it, etc. available globally
    environment: 'jsdom', // Ensures you're using jsdom as the test environment
    setupFiles: './src/tests/setupTests.js', // Path to the setup file for jest-dom or other global setups
  },
});
