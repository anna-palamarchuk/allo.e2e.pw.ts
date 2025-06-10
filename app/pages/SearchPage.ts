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

  async clickOnBuyButtonFromSearchResultPage() {
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

    await buyButton.click();
    return;
  }

}

}