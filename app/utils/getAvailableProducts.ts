import { Locator, expect } from '@playwright/test';

export async function clickOnBuyBtnFromAvailableProduct(
  productItem: Locator, // Локатор для товарів на сторінці
  getBuyButton: (productCard: Locator) => Locator, // Метод для отримання кнопки "Купити"
  attempt = 1,
  maxAttempts = 3
): Promise<string> {
  const countProducts = await productItem.count();
  const availableProducts: Locator[] = [];

  // Перевіряємо наявність доступних товарів
  for (let i = 0; i < countProducts; i++) {
    const product = productItem.nth(i);
    const availabilityText = await product.textContent();

    if (!availabilityText?.includes('Немає в наявності')) {
      availableProducts.push(product);
    }
  }

  // Якщо немає доступних товарів, повертаємо помилку
  if (availableProducts.length === 0) {
    if (attempt >= maxAttempts) {
      throw new Error(`There are no available products after ${maxAttempts} attempts`);
    }
    throw new Error("No available products found");
  }

  // Вибираємо випадковий доступний товар
  const randomProduct = Math.round(Math.random() * (availableProducts.length - 1));
  const randomProductItem = availableProducts[randomProduct];
  
  // Отримуємо назву товару
  const productTitle = await randomProductItem.locator('.product-card__title').textContent();

  // Отримуємо кнопку "Купити"
  const buyButton = getBuyButton(randomProductItem);
  await expect(buyButton).toBeVisible();
  await buyButton.click();

  // Повертаємо назву продукту, який було куплено
  return productTitle;
}
