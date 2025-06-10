import { expect, Locator, Page } from "@playwright/test";
import { BaseModal } from "./BaseModal";

export class CartModal extends BaseModal {
  private cartHeader: Locator;
  private itemTitleInCart: Locator;
  private itemInCart: Locator;
  private plusItem: Locator;
  private quantityOfItems: Locator;
  private minusItem: Locator;
  private goToCart: Locator;
  private deleteProduct: Locator;
  private emtyCardText: Locator;
  private placeOrder: Locator;


  constructor(page: Page) {
    super(page);
    this.cartHeader = page.locator('.v-modal__cmp-header span');
    this.itemTitleInCart = page.locator('.products_list_item .product__item .title');
    this.itemInCart = page.locator('.products__list li');
    this.plusItem = page.locator('.qty :nth-child(3)');
    this.quantityOfItems = page.locator('.qty__count .input');
    this.minusItem = page.locator('.qty > :nth-child(1)');
    this.goToCart = page.locator('//button[contains(., "Перейти у кошик")]');
    this.deleteProduct = page.locator('.content .title :nth-child(3)');
    this.emtyCardText = page.locator('.cart-popup__content');
    this.placeOrder = page.locator('button[class="order-now"]');
  }

  async verifyAddedProductToCart(expectedTitle: string) {
    await expect(this.cartHeader).toBeVisible();
    const headerText = await this.cartHeader.textContent();

    if (headerText?.includes('Супутні товари')) {
      const goToCartButton = this.goToCart;
      await expect(goToCartButton).toBeVisible();
      await goToCartButton.click();
    }

    await expect(this.cartHeader).toContainText('Кошик');

    await expect(this.itemTitleInCart).toContainText(expectedTitle);
  }

  async countAddedProductToCart(expectedProducts: number) {
    await expect(this.itemInCart).toHaveCount(expectedProducts);
  }

  async increaseItemCountInCart() {
    await this.plusItem.click();
  }

  async quantityOfProductItems(expectedQuantity: number) {
    await expect(this.quantityOfItems).toHaveValue(String(expectedQuantity));
  }

  async decreaseAmountOfItems() {
    await this.minusItem.click();
  }

  async deleteProductFromCart() {
    await this.deleteProduct.click();
  }

  async verifyEmptyCard() {
    await expect(this.emtyCardText).toContainText('Ваш кошик порожній.');
  }

  async placeAnOrder(){
    await this.placeOrder.click();
  }
}
