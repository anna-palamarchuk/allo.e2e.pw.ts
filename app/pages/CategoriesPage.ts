import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CategoriesPage extends BasePage {
  private categoryButton: Locator;
  private categoriesMenu: Locator;
  private categoryItem: Locator;
  private productsList: Locator;
  private productItem: Locator;

  constructor(page: Page) {
    super(page);
    this.categoryButton = page.locator('.ct-button');
    this.categoriesMenu = page.locator('.mm__list');
    this.categoryItem = page.locator('.mm__item')
    this.productsList = page.locator('.products-layout__container');
    this.productItem = page.locator('.product-card');
  }

  async clickOnCategoriesButton() {
    await this.categoryButton.click();
  }

  async getCategoriesMenu() {
    await expect(this.categoriesMenu).toBeVisible();
  }

  getSubCategoryLinks(subCategoriesItemInList: Locator): Locator {
    return subCategoriesItemInList.locator('.mm__sub-wrapper a');
  }

  getTypeOfSubCategory(): Locator {
    return this.page.locator('.portal-group__title');

  }

  getBuyButton(productCard: Locator): Locator {
    return productCard.locator('.product-card__buy-box button.v-btn--cart');
  }

  async clickOnRandomCategory() {
    //hover the mouse on random category item
    const count = await this.categoryItem.count();
    const randomIndex = Math.round(Math.random() * (count - 1));
    const randomCategoryItem = this.categoryItem.nth(randomIndex);
    await randomCategoryItem.hover();

    //click on random subcategory
    const subCategoryLinks = this.getSubCategoryLinks(randomCategoryItem);
    await expect(subCategoryLinks.first()).toBeVisible();
    const subCount = await subCategoryLinks.count();
    const randomSubIndex = Math.round(Math.random() * (subCount - 1));

    await subCategoryLinks.nth(randomSubIndex).click();
    const typeSubLinks = this.getTypeOfSubCategory();
    const typeSubLinksCount = await typeSubLinks.count();

    if (typeSubLinksCount > 0) {
      const randomTypeSubIndex = Math.round(Math.random() * (typeSubLinksCount - 1));
      await typeSubLinks.nth(randomTypeSubIndex).click();
    }
    await expect(this.productsList).toBeVisible();
  }

  async clickOnBuyBtnOnRandomProduct(attempt = 1, maxAttempts = 3): Promise<string> {
    const countProducts = await this.productItem.count();
    const availableProducts: Locator[] = [];

    for (let i = 0; i < countProducts; i++) {
      const product = this.productItem.nth(i);
      const availabilityText = await product.textContent();

      if (!availabilityText?.includes('Немає в наявності')) {
        availableProducts.push(product);
      }
    }

    if (availableProducts.length === 0) {
      if (attempt >= maxAttempts) {
        throw new Error(`There is no available products after ${maxAttempts} attempts`);
      }
      await this.clickOnRandomCategory();
      return await this.clickOnBuyBtnOnRandomProduct(attempt + 1, maxAttempts);
    }

    const randomProduct = Math.round(Math.random() * (availableProducts.length - 1));
    const randomProductItem = availableProducts[randomProduct];
    const productTitle = await randomProductItem.locator('.product-card__title').textContent();

    const buyButton = this.getBuyButton(randomProductItem);
    await expect(buyButton).toBeVisible();
    await buyButton.click();

    return productTitle;
  }
}