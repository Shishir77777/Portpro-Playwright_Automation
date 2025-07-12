import test, { Page } from "@playwright/test";
import { LoginHelper } from "../pages/login";
import fs from "fs";

const storagePath = "./storage/admin.json";
if (fs.existsSync(storagePath)) {
  test.use(storagePath);
}

export const TEST = test.extend<{ login: void }>({
  login: [
    async ({ page }: { page: Page }, use: () => any) => {
      const loginHelper = new LoginHelper(page);

      await loginHelper.navigateToLoginPage();

      // const isHeadingVisible = await loginHelper.isSignInHeadingVisible();

      // if (!isHeadingVisible)
      await loginHelper.signIn();

      await loginHelper.skipOnboarding();

      await page.context().storageState({ path: storagePath });
      await use();
    },
    {
      auto: true,
    },
  ],
});
