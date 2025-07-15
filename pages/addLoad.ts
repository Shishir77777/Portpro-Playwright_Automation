import { Locator, Page } from "playwright";
import { BasePage } from "./base";
import { expect } from "playwright/test";

type LoadSelectFields =
  | " Customer"
  | "Pick Up Location"
  | "Delivery Location"
  | "Branch";

type LoadModalTabs =
  | "Load Info"
  | "Billing"
  | "Documents"
  | "Payment"
  | "Routing"
  | "Payable & Expenses"
  | "Tracking"
  | "Messaging"
  | "Audit"
  | "Notes";

type LoadModalTabsEu =
  | "Load Info"
  | "Billing"
  | "Documents"
  | "Payment"
  | "Routing"
  | "Driver Pay & Expenses"
  | "Tracking"
  | "Messaging"
  | "Audit"
  | "Notes";

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
  protected _toastLocator: Locator;
  protected _pendingStatusLocator: Locator;

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
    this._toastLocator = page.locator(".toast-message");
    this._pendingStatusLocator =
      this._modalContainer.getByTestId("status-component");
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

  private isAutoSelect() {
    let isAuto =
      (this.isEu() || this.isUniversal() || this.isMedlog()) ?? false;
    return isAuto;
  }

  public async selectLoadFieldInfo(field: LoadSelectFields) {
    const isAuto = this.isAutoSelect();

    if (isAuto && field === "Branch") return;
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
    const isAuto = this.isAutoSelect();

    let option = "EVANS KEARNY  | 78 John Miller Way, Kearny, NJ 07032, US";
    if (field === "Branch") option = "MTL";

    if (isAuto) await this._listBoxOptionLocator.nth(1).click();
    else await this._listBoxOptionLocator.getByText(option).click();
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

  public async verifyToastMessage(message: string) {
    await expect(this._toastLocator).toContainText(
      message ?? "load is created!"
    );
  }

  public async verifyToastIsVisible() {
    await expect(this._toastLocator).toBeVisible();
  }

  public async addNewLoad() {
    await this.openAddNewLoad();
    await this.toggleToManually();
    await this.selectLoadType("Import");
    await this.selectLoadFieldInfo(" Customer");
    await this.selectLoadFieldInfo("Pick Up Location");
    await this.selectLoadFieldInfo("Delivery Location");
    await this.selectLoadFieldInfo("Branch");
    await this.selectLoadRoute();
    await this.createLoad();
    await this.verifyToastIsVisible();
  }

  public async verifyLoadIsStatus(status = "pending") {
    await this.waitForModalToOpen();
    await expect(this._pendingStatusLocator).toHaveText(status);
  }

  private async waitForPageLoaderToHide() {
    await this._page.waitForLoadState("networkidle");
    const pageLoader = this._modalContainer.locator(".page-loader");
    await pageLoader.waitFor({ state: "hidden", timeout: 2 * 60 * 1000 });
  }

  private async toggleLoadTab(tab: LoadModalTabs | LoadModalTabsEu) {
    await this._modalContainer.getByRole("tab", { name: tab }).click();
    await this.waitForPageLoaderToHide();

    const response = new Response();
    const responseStatus = response.status;

    expect(responseStatus).toBe(200);
    expect(responseStatus).not.toBe(100);
    expect(responseStatus).not.toBe(300);
    expect(responseStatus).not.toBe(400);
    expect(responseStatus).not.toBe(401);
    expect(responseStatus).not.toBe(403);
    expect(responseStatus).not.toBe(404);
    expect(responseStatus).not.toBe(500);
  }

  public async gotoLoadInfo() {
    await this.toggleLoadTab("Load Info");
  }

  public async gotoBilling() {
    await this.toggleLoadTab("Billing");
  }

  public async gotoDocuments() {
    await this.toggleLoadTab("Documents");
  }

  public async gotoPayment() {
    await this.toggleLoadTab("Payment");
  }

  public async gotoRouting() {
    await this.toggleLoadTab("Routing");
  }

  public async gotoPayableAndExpenses() {
    let tab: string;
    tab = this.isEu() ? "Driver Pay & Expenses" : "Payable & Expenses";
    await this.toggleLoadTab(tab as LoadModalTabs | LoadModalTabsEu);
  }

  public async gotoTracking() {
    await this.toggleLoadTab("Tracking");
  }

  public async gotoMessaging() {
    await this.toggleLoadTab("Messaging");
  }

  public async gotoAudit() {
    await this.toggleLoadTab("Audit");
  }

  public async gotoNotes() {
    await this.toggleLoadTab("Notes");
  }

  private async getListingRow() {
    const row = this._page.locator(".rdg-row").first();
    await expect(row).toBeVisible();
    return row;
  }

  private async getLoadCell() {
    let cellNumber = 6;
    if (this.isEu()) cellNumber = 1;

    const row = await this.getListingRow();
    const cell = row
      .locator("div[role='gridcell']")
      .nth(cellNumber)
      .locator("span.cell-content span.text-primary");
    await expect(cell).toBeVisible();
    return cell;
  }

  public async openCellLoad() {
    const cell = await this.getLoadCell();
    await cell.click();

    await this.waitForModalToOpen();
    await this.verifyLoadIsStatus();
  }

  private async getButtonWithIcon(icon: "cloneicon" | "removeicon") {
    const modal = this._modalContainer;
    const button = modal.locator(`//button[@data-for='${icon}']`);
    await expect(button).toBeVisible();
    return button;
  }

  public async duplicateLoad() {
    const duplicateButton = await this.getButtonWithIcon("cloneicon");
    await duplicateButton.click();

    const confirmButton = this._page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    await this.verifyToastMessage("Added!");
  }

  public async deleteLoad() {
    const duplicateButton = await this.getButtonWithIcon("removeicon");
    await duplicateButton.click();

    const confirmButton = this._page.getByRole("button", { name: "Yes" });
    await confirmButton.click();

    // await this.verifyToastIsVisible();
    await this.verifyToastMessage("Removed.");
  }
}
