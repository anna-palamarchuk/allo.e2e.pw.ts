import { test as base } from "@playwright/test";
import { CartModal } from '../modals/CartModals';
import { CheckoutPage } from '../pages/CheckoutPage';
import { SearchPage } from "app/pages/SearchPage";
import { searchData } from "test-data/searchData";

export const test = base
    .extend<{ setUp: void }>({
        setUp: [async ({ page }, use) => {
            const cartModal = new CartModal(page);
            const checkoutPage = new CheckoutPage(page);
            const searchPage = new SearchPage(page);
            const randomSearchData = await searchPage.getRandomSearchData(searchData);
            await searchPage.searchForProduct(randomSearchData);
            await searchPage.getSearchResultsTitle(randomSearchData);
            await searchPage.checkSearchUrl(randomSearchData);
            await searchPage.checkSearchProductItemsInResult(randomSearchData);
            await searchPage.clickOnBuyButtonFromSearchResultPage();
            await cartModal.verifyAddedProductToCart(randomSearchData);
            await cartModal.placeAnOrder();
            await checkoutPage.clickOnChangeButton();
            await checkoutPage.changeUserData('Анна', 'Паламарчук');
            await checkoutPage.deleteProductFromOrder();
            await page.goto('https://allo.ua/ua/');
            await use();
        }, { auto: true }],
    });
