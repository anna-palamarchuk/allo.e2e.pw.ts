import { searchData } from "test-data/searchData";
import { test } from "../app/fixtures/mergeFixtures";

test.describe('Order suite', () => {
test(`A6 Fill the checkout form`, async ({ searchPage, cartModal }) => {
  const randomSearchData = await searchPage.getRandomSearchData(searchData);

    await searchPage.searchForProduct(randomSearchData);
    await searchPage.getSearchResultsTitle;
    await searchPage.checkSearchUrl;
    await searchPage.checkSearchProductItemsInResult;

    await searchPage.clickOnBuyButtonFromSearchResultPage();
    await cartModal.verifyAddedProductToCart;
  })
});