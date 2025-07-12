import { Locator, Page } from "playwright";
import { BasePage } from "./base";
import { expect } from "playwright/test";

export class AddLoad extends BasePage {
  protected _addLoadButtonLocator: Locator;
  protected _modalTitleLocator: Locator;
  protected _modalContainer: Locator;
  protected _loadTypeImport: Locator;
  protected _loadTypeExport: Locator;
  protected _locateTypeRoad: Locator;
  protected _loadTypeBillOnly: Locator;
  protected _customerSelector: Locator;
  protected _pickUpLocationSelector: Locator;
  protected _deliveryLocatorSelector: Locator;
  protected _branchLocatorSelector: Locator;
  protected _containerNumberInput: Locator;

  constructor(page: Page) {
    super(page);
    this._addLoadButtonLocator = page.getByRole("button", {
      name: "Add New Load",
    });
    this._modalContainer = page.locator(".modal-container");
    this._modalTitleLocator = page.locator(".modal-title");
    this._loadTypeImport = page.getByRole("radio", { name: "IMPORT" });
    this._loadTypeExport = page.getByRole("radio", { name: "EXPORT" });
    this._locateTypeRoad = page.getByRole("radio", { name: "ROAD" });
    this._loadTypeBillOnly = page.getByRole("radio", { name: "BILL ONLY" });
    this._customerSelector = page.getByLabel("Customer");
    this._pickUpLocationSelector = page.getByLabel("Pick Up Location");
    this._deliveryLocatorSelector = page.getByLabel("Delivery Location");
    this._branchLocatorSelector = page.getByLabel("Branch");
    this._containerNumberInput = page.getByRole("textbox", {
      name: "Container #",
    });
  }

  public async addNewLoad() {
    await this._addLoadButtonLocator.click();
    await this.waitForModalToOpen();
  }

  private async waitForModalToOpen() {
    await this._modalContainer.waitFor({ state: "visible" });
  }

  private async checkModalTitle() {
    await expect(this._modalTitleLocator).toHaveText("Add New Load");
  }
}
