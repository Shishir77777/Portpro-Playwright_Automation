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

  public isEu() {
    if (process.env.TEST_URL === "eu") return true;
    return false;
  }

  public isUniversal() {
    if (process.env.TEST_URL === "universal") return true;
    return false;
  }

  public isMedlog() {
    if (process.env.TEST_URL === "medlog") return true;
    return false;
  }

  public getButton(buttonName: string) {
    return this._page.getByRole("button", { name: buttonName });
  }
}
