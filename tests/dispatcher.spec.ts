import { TEST } from "../fixture/admin";
import { DispatcherPage } from "../pages/dispatcher";

TEST.describe("Dispatcher", async () => {
  TEST("should navigate to dispatcher page", async ({ page }) => {
    const dispatcherPage = new DispatcherPage(page);

    await dispatcherPage.verifyDispatcherPage();
  });
});
