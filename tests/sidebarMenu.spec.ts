import { TEST } from "../fixture/admin";
import { SidebarHelper } from "../pages/sidebarMenu";

TEST.describe("Navigate to sidebar", async () => {
  TEST("Hover sidebar", async ({ page }) => {
    const sidebarHelper = new SidebarHelper(page);

    await sidebarHelper.hoverSidebar();
    await sidebarHelper.focusSidebarItem("AI Hub");
  });
});
