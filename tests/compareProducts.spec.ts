import { test } from "app/fixtures/fixture";
import { searchData } from "test-data/searchData";

test.describe('Compare products suite for anonymous user', () => {
  for (const items of searchData) {
    test(`A8 Adding and removing products ${items.inputName} to the compare list`, async ({ searchPage, compareProductsPage }) => {
      let expectedTitles: string[];
      await test.step('Enter keyword in search field', async () => {
        await searchPage.searchForProduct(items.inputName);
      });
      await test.step('Check search results', async () => {
        await searchPage.getSearchResultsTitle(items.inputName);
        await searchPage.checkSearchUrl(items.inputName);
        await searchPage.checkSearchProductItemsInResult(items.inputName);
      });
      await test.step('Add products to the compare list', async () => {
        expectedTitles = await searchPage.clickOnCompareButtonOnTwoProducts();
      });
      await test.step('Verify added products in compare list', async () => {
        await compareProductsPage.clickOnCompareButtonOnNavBar();
        await compareProductsPage.verifyAddedProductsInCompareProductsList(expectedTitles);
      });
      await test.step('Removing products from compare list', async () => {
        await compareProductsPage.removeProductsFromCompareList();
      });
    });
  };
});

