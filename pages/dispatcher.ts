import { Page } from "playwright";
import { BasePage } from "./base";
import { expect } from "playwright/test";
import { LISTING_ROUTES } from "../config/config";

export class DispatcherPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async verifyDispatcherPage() {
    await expect(this._page).toHaveURL(LISTING_ROUTES.TMS_DISPATCHER);
  }
}
