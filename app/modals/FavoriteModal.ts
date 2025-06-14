import { expect, Locator, Page } from "@playwright/test";
import { BaseModal } from "./BaseModal";

export class FavoriteModal extends BaseModal {
    private favoriteModalWindow: Locator;
    private favoriteModalText: Locator;
    private closeFavoriteModal: Locator;
    private wishListButtonOnModal: Locator;
    private productTitles: Locator;

    constructor(page: Page) {
        super(page);
        this.favoriteModalWindow = page.locator('.v-modal__cmp');
        this.favoriteModalText = page.locator('.wishlist-popup__text');
        this.closeFavoriteModal = page.locator('.v-modal__close-btn');
        this.wishListButtonOnModal = page.locator('.wishlist-popup__link');
        this.productTitles = page.locator('.product-card__content > a');
    }

    async verifyFavoriteModalWindow() {
        await expect(this.favoriteModalWindow).toBeVisible();
        const fullText = await this.favoriteModalText.innerText();
        const textWithoutSpace = fullText.replace(/\s+/g, ' ').trim();
        expect(textWithoutSpace).toBe('Даний товар успішно доданий у ваш список бажань');
    }

    async closeFavoriteWindow() {
        await expect(this.closeFavoriteModal).toBeVisible();
        await this.closeFavoriteModal.click();
        await expect(this.favoriteModalWindow).toBeHidden();
    }

    async clickOnWIshlistButtonOnModal() {
        await this.wishListButtonOnModal.click();
        await expect(this.page).toHaveURL(/\/wishlist/);
    }

    async verifyAddedProductInWishList(expectedTitle: string) {
        await expect(this.productTitles.filter({ hasText: expectedTitle })).toHaveCount(1);
    }
}
