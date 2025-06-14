import { test as base } from "@playwright/test";
import { SearchPage } from "app/pages/SearchPage";
import { CategoriesPage } from "app/pages/CategoriesPage";
import { CartModal } from "app/modals/CartModals";
import { SignInModal } from "app/modals/SignInModal";
import { CheckoutPage } from 'app/pages/CheckoutPage';
import { FavoriteModal } from "app/modals/FavoriteModal";
import { CompareProductsPage } from "app/pages/CompareProductsPage";
import { ProductDetailsPage } from "app/pages/ProductDetailsPage";
import { FiltersPage } from "app/pages/FiltersPage";
import { SocialMediaLinks } from "app/pages/SocialMediaLinks";
import { YouWatchedPage } from "app/pages/YouWatchedPage";

type Fixture = {
    searchPage: SearchPage;
    categoryList: CategoriesPage;
    cartModal: CartModal;
    signInModal: SignInModal;
    checkoutPage: CheckoutPage,
    favoriteModal: FavoriteModal;
    compareProductsPage: CompareProductsPage;
    productDetailsPage: ProductDetailsPage;
    filtersPage: FiltersPage;
    socialMediaLinks: SocialMediaLinks;
    youWatchedPage: YouWatchedPage;
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
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage)
    },
    favoriteModal: async ({ page }, use) => {
        const favoriteModal = new FavoriteModal(page);
        await use(favoriteModal)
    },
    compareProductsPage: async ({ page }, use) => {
        const compareProductsPage = new CompareProductsPage(page);
        await use(compareProductsPage)
    },
    productDetailsPage: async ({ page }, use) => {
        const productDetailsPage = new ProductDetailsPage(page);
        await use(productDetailsPage)
    },
    filtersPage: async ({ page }, use) => {
        const filtersPage = new FiltersPage(page);
        await use(filtersPage)
    },
    socialMediaLinks: async ({ page }, use) => {
        const socialMediaLinks = new SocialMediaLinks(page);
        await use(socialMediaLinks)
    },
    youWatchedPage: async ({ page }, use) => {
        const youWatchedPage = new YouWatchedPage(page);
        await use(youWatchedPage)
    }
})