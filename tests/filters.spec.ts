import { expect } from "@playwright/test";
import { test } from "../app/fixtures/fixture";

test.describe('Filters suite', () => {
    test(`A10 Filter product from mobile category`, async ({ categoryList, filtersPage }) => {
        await test.step('Select a random Category', async () => {
            await categoryList.navigateToMobileCategory();
            await expect(categoryList.productsList).toBeVisible();
        });
        await test.step('Select option from Popular filter', async () => {
            await filtersPage.chooseOptionPopularFilter();
        });
        await test.step('Select price from Price filter', async () => {
            await filtersPage.choosePriceFromPriceFilter();
        });
        await test.step('Select brand from Brand filter', async () => {
            await filtersPage.chooseBrandFromBrandFilter();
        });
        const responsePromise = filtersPage.getResponseProductDataMatchTheFilters();
        await test.step('Select memory from Memory filter', async () => {
            await filtersPage.chooseMemoryFromMemoryFilter();
        });
        const response = await responsePromise;
        const responseBody = await response.json();
        await test.step('Verify response data', async () => {
            await filtersPage.verifyDataFromResponse(responseBody);
        });
        await test.step('Verify selected filters', async () => {
            await filtersPage.verifyActiveFilters();
        });
    });
});