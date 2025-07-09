import { Page } from "playwright";
import { expect } from "playwright/test";

export class BasePage {
  protected _page: Page;
  constructor(page: Page) {
    this._page = page;
  }

  public async clickButton(buttonName: string) {
    const button = this.getButton(buttonName);
    await expect(button).toBeEnabled();
    await button.click();
  }

  public getButton(buttonName: string) {
    return this._page.getByRole("button", { name: buttonName });
  }
}
