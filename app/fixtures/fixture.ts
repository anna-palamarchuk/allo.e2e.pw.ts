import { test as base } from "@playwright/test";
import { SearchPage } from "app/pages/SearchPage";
import { CategoriesPage } from "app/pages/CategoriesPage";
import { CartModal } from "app/modals/CartModals";
import { SignInModal } from "app/modals/SignInModal";
import {CheckoutPage} from 'app/pages/CheckoutPage';

type Fixture = {
    searchPage: SearchPage;
    categoryList: CategoriesPage;
    cartModal: CartModal;
    signInModal: SignInModal;
    checkoutPage: CheckoutPage,
}

export const test = base.extend<Fixture>({

    page: async ({ page }, use) => {
        await page.goto('https://allo.ua/ua/');
        await use(page);
    },
    searchPage: async ({ page }, use) => {
        const searchPage = new SearchPage(page);
        await use(searchPage)
    },

    categoryList: async ({ page }, use) => {
        const categoryList = new CategoriesPage(page);
        await use(categoryList)
    },

    cartModal: async ({ page }, use) => {
        const cartModal = new CartModal(page);
        await use(cartModal)
    },
     signInModal: async ({ page }, use) => {
        const signInModal = new SignInModal(page);
        await use(signInModal)
    },
    checkoutPage: async ({page}, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage)
    }
})