import { searchData } from "test-data/searchData";
import { test as loginFixtureAndBase } from "../app/fixtures/mergeFixtures";
import { test as defaultData } from "../app/fixtures/defaultContactInfo.fixture";
import { mergeTests } from "@playwright/test";

export const test = mergeTests(loginFixtureAndBase, defaultData);

test.describe('Order suite', () => {
  test(`A6 Fill the checkout form`, async ({ searchPage, cartModal, checkoutPage }) => {
    const randomSearchData = await searchPage.getRandomSearchData(searchData);
    await test.step('Enter keyword in search field', async () => {
      await searchPage.searchForProduct(randomSearchData);
    });
    await test.step('Check search result', async () => {
      await searchPage.getSearchResultsTitle(randomSearchData);
      await searchPage.checkSearchUrl(randomSearchData);
      await searchPage.checkSearchProductItemsInResult(randomSearchData);
    });
    await test.step('Click on buy button on product', async () => {
      await searchPage.clickOnBuyButtonFromSearchResultPage();
    });
    await test.step('Verify added product in cart', async () => {
      await cartModal.verifyAddedProductToCart(randomSearchData);
    });
    await test.step('Place an order', async () => {
      await cartModal.placeAnOrder();
    });
    await test.step('Verify contact info on checkout page', async () => {
      await checkoutPage.verifyCheckoutPageTitle();
    });
    await test.step('Change contact info', async () => {
      await checkoutPage.clickOnChangeButton();
      await checkoutPage.changeUserData('Петрик', `П'яточкин`);
    });
    await test.step('Delete product from place oder page', async () => {
      await checkoutPage.deleteProductFromOrder();
    })
  })
});