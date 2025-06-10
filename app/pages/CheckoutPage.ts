import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  private checkoutTitle: Locator;
  private contactInfoTitle: Locator;
  private userContactInfo: Locator;
    changeButton: Locator;
  

  constructor(page: Page) {
    super(page);
    this.checkoutTitle = page.locator('.onepage_step_title');
    this.contactInfoTitle = page.locator('.onepage_step_content > h3.onepage_step_header:nth-of-type(1)');
    this.userContactInfo = page.locator('span.customer_short_description_info');
    this.changeButton = page.locator('#change-step');
  }

  async verifyCheckoutPageTitle() {
    await expect(this.checkoutTitle).toContainText('Оформлення замовлення');
  }
  async verifyContactInfoBlock(){
    await expect(this.contactInfoTitle).toContainText('1. Контактна інформація');
    await expect(this.userContactInfo).toContainText('Анна Паламарчук');
    await expect(this.userContactInfo).toContainText('+38(097) 996-65-95');
    await expect(this.changeButton).toContainText('Змінити');
  }
  async clickOnChangeButton() {
    await this.changeButton.click();
  }

}