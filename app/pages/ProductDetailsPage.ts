import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage {
    private titleOfProduct: Locator;
    private aboutProduct: Locator;
    private characteristics: Locator;
    private characteristicsSection: Locator;
    private reviewAndRatingsTab: Locator;
    private reviewTitle: Locator;
    private ratingsTitle: Locator;
    private buyButtonOnDetailsPage: Locator;
    private relatedProductsBlock: Locator;
    private relatedProductsTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.titleOfProduct = page.locator('.p-view__header-title');
        this.aboutProduct = page.locator('li[data-tab="main"] a');
        this.characteristics = page.locator('li[data-tab="specs"] p');
        this.characteristicsSection = page.locator('section[class="p-specs p-view__content-wrapper"]');
        this.reviewAndRatingsTab = page.locator('li[data-tab="discussion"]');
        this.reviewTitle = page.locator('.comments-preview__header p');
        this.ratingsTitle = page.locator('.average-estimate__title');
        this.buyButtonOnDetailsPage = page.locator('#product-buy-button');
        this.relatedProductsBlock = page.locator('.v-modal__cmp');
        this.relatedProductsTitle = page.locator('.related-products__tile-name');
    }

    async verifyProductTitleOnDetailsPage(expectedTitle: string) {
        await expect(this.titleOfProduct).toBeVisible();
        const actualTitle = (await this.titleOfProduct.innerText()).trim();
        expect(actualTitle).toBe(expectedTitle.trim());
    }

    async verifyCharacteristicsSectionOnProductPage() {
        await expect(this.aboutProduct).toBeVisible();
        await expect(this.aboutProduct).toContainText('Про товар');
        await expect(this.characteristics).toContainText('Характеристики');
        await this.characteristics.click();
        await expect(this.characteristicsSection).toContainText('Характеристики');
    }

    async verifyReviewAndFeedbackSection() {
        await expect(this.reviewAndRatingsTab).toBeVisible();
        await this.reviewAndRatingsTab.click();
        await expect(this.reviewTitle).toContainText('Відгуки і питання');
        await expect(this.ratingsTitle).toContainText('Оцінка користувачів');
    }

    async clickOnBuyButton() {
        await expect(this.buyButtonOnDetailsPage).toBeVisible();
        const productTitle = (await this.titleOfProduct.innerText()).trim();
        await this.buyButtonOnDetailsPage.click();
        await expect(this.relatedProductsBlock).toBeVisible();
        await expect(this.relatedProductsTitle.first()).toContainText(productTitle);
    }
}
