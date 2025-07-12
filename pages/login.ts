import { Locator, Page } from "playwright";
import { LISTING_ROUTES, USER_CREDENTIALS } from "../config/config";
import { expect } from "playwright/test";
import { BasePage } from "./base";

export class LoginHelper extends BasePage {
  protected _signInHeading: Locator;
  protected _usernameLocator: Locator;
  protected _passwordLocator: Locator;
  protected _signInButtonLocator: Locator;
  protected _spinnerLocator: Locator;

  constructor(page: Page) {
    super(page);
    this._signInHeading = page.locator(".title-32");
    this._usernameLocator = page.getByRole("textbox", { name: "email" });
    this._passwordLocator = page.getByRole("textbox", { name: "password" });
    this._signInButtonLocator = page.getByRole("button", { name: "Sign In" });
    this._spinnerLocator = page.getByRole("status");
  }

  public async isSignInHeadingVisible() {
    return await this._signInHeading.isVisible();
  }

  private async _getSignInHeadingText() {
    return await this._signInHeading.textContent();
  }

  public async verifySignInHeadingText() {
    const signInHeadingText = await this._getSignInHeadingText();
    expect(signInHeadingText).toContain("Sign In");
  }

  public async navigateToLoginPage() {
    await this._page.goto(LISTING_ROUTES.LOGIN);
    await expect(this._signInHeading).toBeVisible();
  }

  public async signIn() {
    await this._usernameLocator.fill(USER_CREDENTIALS.username);
    await this._passwordLocator.fill(USER_CREDENTIALS.password);
    await this._signInButtonLocator.click();
    await this._page.waitForLoadState("networkidle");
    await expect(this._spinnerLocator).not.toBeVisible();

    await this._page.waitForURL(LISTING_ROUTES.TMS_DISPATCHER);
  }

  public async skipOnboarding() {
    const button = this.getButton("Skip for now");
    const isButtonVisible = await button.isVisible();
    if (isButtonVisible) {
      await button.click();
    }
  }
}
