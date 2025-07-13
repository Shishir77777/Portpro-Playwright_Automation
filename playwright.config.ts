import { defineConfig } from "playwright/test";
import * as os from "node:os";
import { devices } from "playwright";

export default defineConfig({
  timeout: 2 * 60 * 1000,
  retries: process.env.CI ? 2 : 1,
  workers: 2,
  testDir: "./tests",
  reporter: [
    ["line"],
    [
      "allure-playwright",
      {
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
        outputDir: "allure-report",
      },
    ],
  ],
  use: {
    trace: "retry-with-trace",
    video: "retry-with-video",
    screenshot: "on-first-failure",
  },

  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Desktop Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});
