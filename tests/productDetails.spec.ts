import { test } from "../app/fixtures/fixture";
import { searchData } from "test-data/searchData";

test.describe('Product details suite', () => {
    for (const items of searchData) {
        test(`A9 Verify product ${items.inputName} details page`, async ({ searchPage, productDetailsPage }) => {
            await test.step('Enter keyword in search field', async () => {
                await searchPage.searchForProduct(items.inputName);
            });
            await test.step('Check search results', async () => {
                await searchPage.getSearchResultsTitle(items.inputName);
                await searchPage.checkSearchUrl(items.inputName);
                await searchPage.checkSearchProductItemsInResult(items.inputName);
            });

            let titleOfChosenProduct: string;
            await test.step('Click on product from search result', async () => {
                titleOfChosenProduct = await searchPage.clickOnProduct();
            });
            await test.step('Verify product title on product details page', async () => {
                await productDetailsPage.verifyProductTitleOnDetailsPage(titleOfChosenProduct);
                await productDetailsPage.verifyCharacteristicsSectionOnProductPage();
            });
            await test.step('Verify review and feedback section', async () => {
                await productDetailsPage.verifyReviewAndFeedbackSection();
            });
            await test.step('Verify buy button', async () => {
                await productDetailsPage.clickOnBuyButton();
            });
        });
    };

});

