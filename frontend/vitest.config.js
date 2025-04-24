/// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // not 'c8' unless you really want c8
      reporter: ['text', 'html'], // optional: add 'lcov' if you use Coveralls or similar
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['**/*.test.{js,ts,jsx,tsx}', 'node_modules'],
    }
    
  },
});


// import { defineConfig } from 'vitest/config';

// export default defineConfig({
//   test: {
//     globals: true, // Automatically makes expect, describe, it, etc. available globally
//     environment: 'jsdom', // Ensures you're using jsdom as the test environment
//     setupFiles: './src/tests/setupTests.js', // Path to the setup file for jest-dom or other global setups
//   },
// });
