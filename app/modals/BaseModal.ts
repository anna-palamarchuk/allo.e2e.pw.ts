import { Page } from "@playwright/test";

export class BaseModal {
  protected page: Page;  

  constructor(page: Page) {
    this.page = page;
  }

}
