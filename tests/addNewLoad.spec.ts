import { TEST } from "../fixture/admin";
import { AddLoad } from "../pages/addLoad";

TEST.describe("Add New Load", async () => {
  TEST("Add New Load", async ({ page }) => {
    const addLoad = new AddLoad(page);

    await addLoad.openAddNewLoad();
    await addLoad.toggleToManually();
    await addLoad.selectLoadType("Import");
    await addLoad.selectLoadFieldInfo(" Customer");
    await addLoad.selectLoadFieldInfo("Pick Up Location");
    await addLoad.selectLoadFieldInfo("Delivery Location");
    await addLoad.selectLoadFieldInfo("Branch");
    await addLoad.selectLoadRoute();
    await addLoad.createLoad();
  });
});
