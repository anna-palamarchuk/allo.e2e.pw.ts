import { expect, Locator, Page } from "@playwright/test";
import { BaseModal } from "./BaseModal";
import { userDataForSignIn } from "test-data/userData";

export class SignInModal extends BaseModal {
  private profileButton: Locator;
  private signInMenu: Locator;
  private loginAndPasswordBtn: Locator;
  private phoneOrEmailField: Locator;
  private passwordField: Locator;
  private signInBtn: Locator;
  private accountMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.signInMenu = page.locator('.customer-menu .auth');
    this.loginAndPasswordBtn = page.locator('.auth__enter-password > button > .a-button__text');
    this.phoneOrEmailField = page.locator("input[placeholder='Введіть телефон або e-mail']")
    this.passwordField = page.locator("input[placeholder='Введіть пароль']");
    this.signInBtn = page.locator('//button[contains(., "Увійти")]');
    this.profileButton = page.locator('.mh-profile button');
    this.accountMenu = page.locator('.mh-profile__content');
  }

  async clickOnProfileButton(){
    await this.profileButton.click();
  }
  async waitForSignInMenuIsVisible() {
    await expect(this.signInMenu).toBeVisible();
  }

  async clickOnLoginAndPassButton(){
    await this.loginAndPasswordBtn.click();
  }

  async fillSignInForm() {
    await this.phoneOrEmailField.fill(userDataForSignIn.email);
    await this.passwordField.fill(userDataForSignIn.password);
  }

  async clickOnSignInButton(){
    await this.signInBtn.click();
  }
}
