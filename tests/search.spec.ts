import { test } from "../app/fixtures/fixture";
import { searchData } from "test-data/searchData";

test.describe('Search suite', () => {
  for (const items of searchData) {
    test(`A1 Search items ${items.inputName}`, async ({ searchPage }) => {
      await test.step('Enter keyword in search field', async () => {
        await searchPage.searchForProduct(items.inputName);
      });
      await test.step('Check search results', async () => {
        await searchPage.getSearchResultsTitle(items.inputName);
        await searchPage.checkSearchUrl(items.inputName);
        await searchPage.checkSearchProductItemsInResult(items.inputName);
      });
    });
  };

});

