import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
export class SearchPage extends BasePage {
  private searchInputLocator: Locator;
  private searchResultsTitle: Locator;
  private searchURL: string;
  private productTitleSearchResults: Locator;
  private productCart: Locator;
  private buyButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInputLocator = page.locator('input[id="search-form__input"]');
    this.searchResultsTitle = page.locator('.snap-slider__item > span.b-crumbs__link').filter({ hasText: 'Результати пошуку для' }).first();
    this.searchURL = 'https://allo.ua/ua/catalogsearch/result/?q=';
    this.productTitleSearchResults = page.locator('.product-card__content > a');
    this.productCart = page.locator('.product-card');
    this.buyButton = page.locator('//button[contains(., "Купити")]');
  }

  async searchForProduct(searchData: string) {
    await this.searchInputLocator.fill(searchData);
    await this.searchInputLocator.press('Enter');
  }

  async getSearchResultsTitle(searchData: string) {
    await expect((this.searchResultsTitle)
    ).toContainText(`Результати пошуку для '${searchData}'`, { ignoreCase: true });
  }

  async checkSearchUrl(searchData: string) {
    const expectedUrl = `${this.searchURL}${encodeURIComponent(searchData)}`;
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async checkSearchProductItemsInResult(searchData: string) {
    const totalResults = await this.productTitleSearchResults.count();
    const itemsToCheck = Math.min(5, totalResults);
    for (let i = 0; i < itemsToCheck; i++) {
      const title = await this.productTitleSearchResults.nth(i).innerText();
      expect(title.toLowerCase()).toContain(searchData.toLowerCase());
    }
  }

  async getRandomSearchData(searchData: { inputName: string }[]) {
    const randomIndex = Math.floor(Math.random() * searchData.length);
    return searchData[randomIndex].inputName;
  }

  async clickOnBuyButtonFromSearchResultPage(): Promise<string | undefined> {
    const count = await this.productCart.count();

    for (let i = 0; i < count; i++) {
      const product = this.productCart.nth(i);
      const buyButton = product.locator('button:has-text("Купити")');

      if (await buyButton.count() === 0) {
        continue;
      }

      const outOfStockText = product.locator(':has-text("Немає в наявності")');
      if (await outOfStockText.count() > 0) {
        continue;
      }

      const productTitle = (
        await product.locator('.product-card__content > a').innerText()
      ).replace(/\s+/g, ' ').trim();

      await buyButton.click();
      return productTitle;
    }
  }

  async clickOnFavoriteIcon(): Promise<string> {
    const productCount = await this.productCart.count();

    for (let i = 0; i < productCount; i++) {
      const product = this.productCart.nth(i);
      const favoriteButton = product.locator('button.favorite');

      if (await favoriteButton.count() > 0 && await favoriteButton.isVisible()) {
        const productTitle = await product.locator('.product-card__content > a').innerText();
        await favoriteButton.click();
        return productTitle;
      }
    }
  }

  async clickOnCompareButtonOnTwoProducts(): Promise<string[]> {
    const productCount = await this.productCart.count();
    const selectedProductsTitles: string[] = [];

    for (let i = 0; i < productCount; i++) {
      const product = this.productCart.nth(i);
      const compareButton = product.locator('button.compare');

      if ((await compareButton.count()) > 0 && (await compareButton.isVisible())) {
        const productTitle = await product.locator('.product-card__content > a').innerText();
        await compareButton.click();
        selectedProductsTitles.push(productTitle);

        if (selectedProductsTitles.length === 2) break;
      }
    } return selectedProductsTitles;
  }
  async clickOnProduct(): Promise<string> {
    const productCount = await this.productCart.count();

    for (let i = 0; i < productCount; i++) {
      const product = this.productCart.nth(i);
      const productTitle = product.locator('.product-card__content > a');

      if (await productTitle.count() > 0 && await productTitle.isVisible()) {
        const title = await productTitle.innerText();
        await productTitle.click();
        return title.trim();
      }
    }
  }
}