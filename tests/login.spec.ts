import test from "playwright/test";
import { LoginHelper } from "../pages/login";

test.describe("Login", async () => {
  test("should navigate to login page", async ({ page }) => {
    const loginHelper = new LoginHelper(page);
    await loginHelper.navigateToLoginPage();
    await loginHelper.verifySignInHeadingText();
    await loginHelper.signIn();
  });
});
