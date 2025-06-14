import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class CheckoutPage extends BasePage {
  private checkoutTitle: Locator;
  private contactInfoTitle: Locator;
  private userContactInfo: Locator;
  private changeButton: Locator;
  private firstNameLocator: Locator;
  private lastNameLocator: Locator;
  private changeDataLocator: Locator;
  private deleteProduct: Locator;
  private deleteProductFromCart: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutTitle = page.locator('.onepage_step_title');
    this.contactInfoTitle = page.locator('.onepage_step_content > h3.onepage_step_header:nth-of-type(1)');
    this.userContactInfo = page.locator('span.customer_short_description_info');
    this.changeButton = page.locator('#change-step');
    this.firstNameLocator = page.locator('input[name="firstname"]');
    this.lastNameLocator = page.locator('input[name="lastname"]');
    this.changeDataLocator = page.locator('button[type="submit"]');
    this.deleteProduct = page.locator('#mini-cart-edit');
    this.deleteProductFromCart = page.locator('.content .title :nth-child(3)');
  }

  async verifyCheckoutPageTitle() {
    await expect(this.checkoutTitle).toContainText('Оформлення замовлення');
  }
  async verifyContactInfoBlock() {
    await expect(this.contactInfoTitle).toContainText('1. Контактна інформація');
    await expect(this.userContactInfo).toContainText('Анна Паламарчук');
    await expect(this.userContactInfo).toContainText('+38(097) 996-65-95');
    await expect(this.changeButton).toContainText('Змінити');
  }
  async clickOnChangeButton() {
    await this.changeButton.click();
  }

  async changeUserData(firstname: string, lastname: string) {
    await this.firstNameLocator.fill(firstname);
    await this.lastNameLocator.fill(lastname);
    await this.changeDataLocator.click();
    await await expect(this.userContactInfo).toContainText(firstname);
    await expect(this.userContactInfo).toContainText(lastname);
  }

  async deleteProductFromOrder() {
    await expect(this.deleteProduct).toBeVisible();
    await this.deleteProduct.click();
    await this.deleteProductFromCart.click();
  }
}