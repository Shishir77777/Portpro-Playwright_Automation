import { Locator, Page } from "playwright";
import { BasePage } from "./base";

export class SidebarHelper extends BasePage {
  protected _navLocator: Locator;
  protected _sidebarItem: Locator;
  protected _subItemContainer: string;
  constructor(page: Page) {
    super(page);
    this._navLocator = page.locator(".sidebar-nav");
    this._sidebarItem = page.locator(".sidebar-item");
    this._subItemContainer = "div.first-level";
  }

  public async hoverSidebar() {
    await this._navLocator.hover();
    await this._page.waitForLoadState("networkidle");
    await this._page.waitForTimeout(1000);
  }

  public async focusSidebarItem(itemName: string) {
    const sidebarItem = this._sidebarItem.getByText(itemName);
    await sidebarItem.click();

    await this._page.waitForLoadState("networkidle");
    await this._page.waitForTimeout(1000);

    const container = sidebarItem.locator(this._subItemContainer);
    const isContainerVisible = await container.first().isVisible();
    if (!isContainerVisible) return;

    const allLinks = await container.getByRole("link").allInnerTexts();

    for (let link of allLinks) {
      const subItem = this._page.getByRole("link", { name: link });
      await subItem.click();

      await this._page.waitForLoadState("networkidle");
      await this._page.waitForTimeout(1000);
    }
  }
}
