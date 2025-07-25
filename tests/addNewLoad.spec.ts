import { TEST } from "../fixture/admin";
import { AddLoad } from "../pages/addLoad";

TEST.describe("Add New Load", async () => {
  TEST("Add New Load", async ({ page }) => {
    const addLoad = new AddLoad(page);

    await addLoad.addNewLoad();
  });

  TEST("Toggle Load Tabs", async ({ page }) => {
    const addLoad = new AddLoad(page);

    await addLoad.addNewLoad();
    await addLoad.verifyLoadIsStatus();
    await addLoad.gotoLoadInfo();
    await addLoad.gotoBilling();
    await addLoad.gotoDocuments();
    await addLoad.gotoPayment();
    await addLoad.gotoRouting();
    await addLoad.gotoPayableAndExpenses();
    await addLoad.gotoTracking();
  });

  TEST("Duplicate Load", async ({ page }) => {
    const addLoad = new AddLoad(page);

    await addLoad.openCellLoad();
    await addLoad.duplicateLoad();
  });

  TEST("Delete Load", async ({ page }) => {
    const addLoad = new AddLoad(page);

    await addLoad.openCellLoad();
    await addLoad.deleteLoad();
  });
});
