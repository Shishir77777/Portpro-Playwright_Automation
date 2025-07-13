import { Locator, Page } from "playwright";
import { BasePage } from "./base";
import { expect } from "playwright/test";

type LoadSelectFields =
  | " Customer"
  | "Pick Up Location"
  | "Delivery Location"
  | "Branch";
export class AddLoad extends BasePage {
  protected _addLoadButtonLocator: Locator;
  protected _modalTitleLocator: Locator;
  protected _modalContainer: Locator;
  protected _loadTypeImport: Locator;
  protected _loadTypeExport: Locator;
  protected _locateTypeRoad: Locator;
  protected _loadTypeBillOnly: Locator;
  protected _containerNumberInput: Locator;
  protected _tablistLocator: Locator;
  protected _listBoxLocator: Locator;
  protected _listBoxOptionLocator: Locator;

  constructor(page: Page) {
    super(page);
    this._addLoadButtonLocator = page.getByRole("button", {
      name: "Add New Load",
    });
    this._modalContainer = page.getByRole("dialog").locator(".modal-dialog");
    this._modalTitleLocator = page.locator(".modal-title");
    this._loadTypeImport = page.getByRole("radio", { name: "IMPORT" });
    this._loadTypeExport = page.getByRole("radio", { name: "EXPORT" });
    this._locateTypeRoad = page.getByRole("radio", { name: "ROAD" });
    this._loadTypeBillOnly = page.getByRole("radio", { name: "BILL ONLY" });
    this._containerNumberInput = page.getByRole("textbox", {
      name: "Container #",
    });
    this._tablistLocator = page.getByRole("tablist");
    this._listBoxLocator = page.getByRole("listbox");
    this._listBoxOptionLocator = page.getByRole("option");
  }

  public async openAddNewLoad() {
    await this._addLoadButtonLocator.click();
    await this.waitForModalToOpen();
    await this.checkModalTitle();
  }

  private async waitForModalToOpen() {
    await this._modalContainer.waitFor({ state: "visible" });
  }

  private async checkModalTitle() {
    await expect(this._modalTitleLocator).toHaveText("New Load");
  }

  private async clickOnTablist(tablist: "Manually" | "Automatically") {
    const modal = this._modalContainer;
    const locateTab = modal
      .locator(this._tablistLocator)
      .locator("li")
      .getByText(tablist);
    await locateTab.click();
  }

  public async toggleToManually() {
    await this.clickOnTablist("Manually");
  }

  public async toggleToAutomatically() {
    await this.clickOnTablist("Automatically");
  }

  public async selectLoadType(loadType: "Import" | "Export") {
    if (loadType === "Import") {
      await this._loadTypeImport.click();
    } else {
      await this._loadTypeExport.click();
    }
  }

  public async selectLoadFieldInfo(field: LoadSelectFields) {
    await this._modalContainer
      .locator(`//label[text()='${field}']//following-sibling::div`)
      .click();
    await this.waitForListBoxToOpen();
    await this.selectListBoxOption(field);
  }

  private async waitForListBoxToOpen() {
    await this._listBoxLocator.waitFor({ state: "visible" });
  }

  private async selectListBoxOption(field: LoadSelectFields) {
    let option = "EVANS KEARNY  | 78 John Miller Way, Kearny, NJ 07032, US";
    if (field === "Branch") option = "MTL";

    await this._listBoxOptionLocator.getByText(option).click();
  }

  public async selectLoadRoute() {
    const modal = this._modalContainer;
    const locateRoute = modal.locator(`//input[@id='prepull-drop-hook']`);
    await locateRoute.click();
  }

  public async createLoad() {
    const modal = this._modalContainer;
    const locateCreate = modal.locator(`//button[text()='Create Load']`);
    await locateCreate.click();
    await this._page.waitForLoadState("networkidle");
  }
}
