/**
 * Playwright config for usesteady-web smoke tests.
 *
 * Tests run against a locally started `next start` server so they exercise
 * the actual production build — not the dev server.
 *
 * CI flow (see .github/workflows/ci.yml):
 *   1. npm run build       (creates .next/)
 *   2. npm run test:e2e    (Playwright starts `next start`, runs smoke suite)
 *
 * Local flow:
 *   npm run build && npm run test:e2e
 */

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",

  // Fail fast — if the homepage is broken there is no point running the rest.
  fullyParallel: false,
  workers: 1,

  // Retry once on CI for network flakes; fail fast locally.
  retries: process.env["CI"] ? 1 : 0,

  timeout: 30_000,

  use: {
    baseURL: "http://localhost:3000",
    actionTimeout: 10_000,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  // Run Chromium only — this is a marketing site, cross-browser is overkill
  // for smoke gating. Full cross-browser tests can be added separately.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Start the production Next.js server before tests.
  // `npm run build` must have been run first (the CI workflow does this).
  webServer: {
    command: "npm run start",
    port: 3000,
    timeout: 60_000,
    // In CI, always start a fresh server. Locally, reuse if already running.
    reuseExistingServer: !process.env["CI"],
    stdout: "ignore",
    stderr: "pipe",
  },

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  outputDir: "test-results",
});
