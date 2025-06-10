import { test } from "../app/fixtures/fixture";

test.describe('Basket suite', () => {

  test(`A2 Adding product to the cart`, async ({ categoryList, cartModal }) => {
    await test.step('Select a random Category', async () => {
      await categoryList.clickOnCategoriesButton();
      await categoryList.getCategoriesMenu();
      await categoryList.clickOnRandomCategory();
    });
    const expectedTitle = await test.step('Add random Product to the Cart', async () => {
      return await categoryList.clickOnBuyBtnOnRandomProduct();
    });
    await test.step('Verify Product is added with count 1', async () => {
      await cartModal.verifyAddedProductToCart(expectedTitle);
      await cartModal.countAddedProductToCart(1);
    });
  });

  test('A3 Increase item count in cart', async ({ categoryList, cartModal }) => {
    await test.step('Select a random Category', async () => {
      await categoryList.clickOnCategoriesButton();
      await categoryList.getCategoriesMenu();
      await categoryList.clickOnRandomCategory();
    });
    const expectedTitle = await test.step('Add random Product to the Cart', async () => {
      return await categoryList.clickOnBuyBtnOnRandomProduct();
    });
    await test.step('Verify Product is added with count 1', async () => {
      await cartModal.verifyAddedProductToCart(expectedTitle);
      await cartModal.countAddedProductToCart(1);
    });

    await test.step('Verify quantity of product is increased', async () => {
      await cartModal.increaseItemCountInCart();
      await cartModal.quantityOfProductItems(2);
    });
  });

  test('A4 Decrease item count in cart', async ({ categoryList, cartModal }) => {
    await test.step('Select a random Category', async () => {
      await categoryList.clickOnCategoriesButton();
      await categoryList.getCategoriesMenu();
      await categoryList.clickOnRandomCategory();
    });
    const expectedTitle = await test.step('Add random Product to the Cart', async () => {
      return await categoryList.clickOnBuyBtnOnRandomProduct();
    });
    await test.step('Verify Product is added with count 1', async () => {
      await cartModal.verifyAddedProductToCart(expectedTitle);
      await cartModal.countAddedProductToCart(1);
    });

    await test.step('Verify quantity of product is increased', async () => {
      await cartModal.increaseItemCountInCart();
      await cartModal.quantityOfProductItems(2);
    });

    await test.step('Verify quantity of product is decreased', async () => {
      await cartModal.decreaseAmountOfItems();
      await cartModal.quantityOfProductItems(1);
    });
  });

  test('A5 Delete product from cart', async ({ categoryList, cartModal }) => {
    await test.step('Select a random Category', async () => {
      await categoryList.clickOnCategoriesButton();
      await categoryList.getCategoriesMenu();
      await categoryList.clickOnRandomCategory();
    });
    const expectedTitle = await test.step('Add random Product to the Cart', async () => {
      return await categoryList.clickOnBuyBtnOnRandomProduct();
    });
    await test.step('Verify Product is added with count 1', async () => {
      await cartModal.verifyAddedProductToCart(expectedTitle);
      await cartModal.countAddedProductToCart(1);
    });

    await test.step('Remove product from card', async () => {
      await cartModal.deleteProductFromCart();
    });

    await test.step('Verify that product is removed from card', async () => {
      await cartModal.verifyEmptyCard();
    });
  });
});