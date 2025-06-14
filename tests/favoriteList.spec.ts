import { test } from "../app/fixtures/mergeFixtures";
import { searchData } from "test-data/searchData";

test.describe('Favorite list suite for signed in user', () => {
  for (const items of searchData) {
    test(`A7 Adding product ${items.inputName} to the favorite list`, async ({ searchPage, favoriteModal }) => {
      let expectedTitle: string;
      await test.step('Enter keyword in search field', async () => {
        await searchPage.searchForProduct(items.inputName);
      });
      await test.step('Check search results', async () => {
        await searchPage.getSearchResultsTitle(items.inputName);
        await searchPage.checkSearchUrl(items.inputName);
        await searchPage.checkSearchProductItemsInResult(items.inputName);
      });
      await test.step('Add product to the favorite list', async () => {
        expectedTitle = await searchPage.clickOnFavoriteIcon();
      });
      await test.step('Check if added product displays in favorite list', async () => {
        await favoriteModal.verifyFavoriteModalWindow();
      });
      await test.step('Verify favorite product in list', async () => {
        await favoriteModal.clickOnWIshlistButtonOnModal();
        await favoriteModal.verifyAddedProductInWishList(expectedTitle);
      });
    });
  };
});

