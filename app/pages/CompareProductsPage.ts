import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CompareProductsPage extends BasePage {
    private compareButtonOnNav: Locator;
    private productTitles: Locator;
    private removeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.compareButtonOnNav = page.locator('a.mh-button.mh-compare');
        this.productTitles = page.locator('.product-card__content > a');
        this.removeButton = page.locator('svg.remove-icon');
    }

    async clickOnCompareButtonOnNavBar() {
        await expect(this.compareButtonOnNav).toBeVisible();
        await this.compareButtonOnNav.click();
        await expect(this.page).toHaveURL(/\/product_compare/);
    }

    async verifyAddedProductsInCompareProductsList(expectedTitles: string[]) {
        await expect(this.productTitles).toHaveCount(2);
        for (const title of expectedTitles) {
            await expect(this.productTitles.filter({ hasText: title })).toHaveCount(1);
        }
    }

    async removeProductsFromCompareList() {
        const count = await this.removeButton.count();
        for (let i = count - 1; i >= 0; i--) {
            await this.removeButton.nth(i).click();
        }
    }
}
