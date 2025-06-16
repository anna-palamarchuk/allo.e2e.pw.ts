import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class FiltersPage extends BasePage {
    private popularFilterTitle: Locator;
    private readyToShip: Locator;
    private showProductPopUp: Locator;
    private priceFilterTitle: Locator;
    private priceRange: Locator;
    private brandFilterTitle: Locator;
    private memoryFilterTitle: Locator;
    private activeFilters: Locator;

    constructor(page: Page) {
        super(page);
        this.popularFilterTitle = page.locator('[data-id="popular"]');
        this.readyToShip = page.locator('[data-id="in_stock"]');
        this.showProductPopUp = page.locator('.f-popup__message');
        this.priceFilterTitle = page.locator('[data-id="price"]');
        this.priceRange = page.locator('input.f-range__form-input');
        this.brandFilterTitle = page.locator('[data-id="brand"]');
        this.memoryFilterTitle = page.locator('[data-id="objom_vstroennoj_pamjati_filtr_mobilnye"]');
        this.activeFilters = this.page.locator('a.f-chip');
    }

    async chooseOptionPopularFilter() {
        await expect(this.popularFilterTitle).toBeVisible();
        await expect(this.popularFilterTitle).toContainText('Популярні фільтри');
        await expect(this.readyToShip).toBeVisible();
        await expect(this.readyToShip).toContainText('Готовий до відправки');
        await this.readyToShip.click();
        await expect(this.readyToShip).toHaveClass(/active/);
        await this.getShowProductPopup();
    }

    async getShowProductPopup() {
        await expect(this.showProductPopUp).toBeVisible();
        await this.showProductPopUp.click();
    }

    async choosePriceFromPriceFilter() {
        await expect(this.priceFilterTitle).toBeVisible();
        await expect(this.priceFilterTitle).toContainText('Ціна, ₴');
        await this.priceRange.nth(0).click();
        await this.priceRange.nth(0).fill('15000');
        await this.priceRange.nth(1).click();
        await this.priceRange.nth(1).fill('35000');
        await this.getShowProductPopup();
    }

    async chooseBrandFromBrandFilter() {
        await expect(this.brandFilterTitle).toBeVisible();
        await expect(this.brandFilterTitle).toContainText('Виробник');
        const samsungLink = this.page.locator('a.f-check', { hasText: 'Samsung' }).first();
        await expect(samsungLink).toBeVisible();
        await samsungLink.click();
        await this.getShowProductPopup();
    }

    async chooseMemoryFromMemoryFilter() {
        await expect(this.memoryFilterTitle).toBeVisible();
        await expect(this.memoryFilterTitle).toContainText(`Внутрішня пам'ять`);
        await this.memoryFilterTitle.click();
        await this.page.locator('a.f-check', { hasText: '128 ГБ' }).click();
        await this.getShowProductPopup();
    }

    async getResponseProductDataMatchTheFilters() {
        const repsonseOfMatchedProducts = this.page.waitForResponse('**/catalog/category/update/**');
        return repsonseOfMatchedProducts;
    }
    verifyDataFromResponse(responseBody: any) {
        for (const productItem of responseBody.product_list.items) {
            expect.soft(productItem.brand).toEqual('Samsung');
            expect.soft(productItem.price.price).toBeGreaterThanOrEqual(15000);
            expect.soft(productItem.price.price).toBeLessThanOrEqual(35000);
        }
    }

    async verifyActiveFilters() {
        const choosenFilters = [
            'Готовий до відправки',
            '15 000 ₴ - 35 000 ₴',
            'Samsung',
            '128 ГБ'
        ];

        const normalize = (str: string) =>
            str.replace(/\s+/g, ' ').replace(/\u00A0/g, ' ').trim();

        const actualTexts = await this.activeFilters.allTextContents();

        const chosenFilterSet = new Set();
        for (const chosenFilter of choosenFilters) {
            chosenFilterSet.add(normalize(chosenFilter));
        }
        for (let i = 0; i < choosenFilters.length; i++) {
            const actual = normalize(actualTexts[i] || '');
            expect(chosenFilterSet.has(actual)).toBeTruthy()
        }
    }

}