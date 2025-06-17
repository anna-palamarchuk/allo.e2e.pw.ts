🚀 Allo E2E Test Automation

[![Build Status](https://github.com/anna-palamarchuk/allo.e2e.pw.ts/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/anna-palamarchuk/allo.e2e.pw.ts/actions/workflows/playwright.yml)

A modern **end-to-end testing** framework using **Playwright** and **TypeScript** for the [Allo](https://allo.ua) website.

---

## 🌟 Project structure

```text
allo.e2e.pw.ts/
├── app/                                   # Core application components (Page Object Model)
│   ├── fixtures/                          # Test fixtures
│   │   ├── auth.fixture.ts                # Fixture for login
│   │   ├── defaultContactInfo.fixture.ts  # Fixture for set up contant info for oder test
│   │   ├── fixture.ts                     # Test fixture
│   │   └── mergeFixtures.ts               # Merged fixture and auth.fixture
│   ├── modals/                            # Modal dialogs
│       ├── BaseModal.ts                   # Base modal
│       ├── CartModal.ts                   # Cart modal 
│       ├── FavoriteModal.ts               # Favorite products modal
│       ├── SignInModal.ts                 # Sign In modal
│   ├── pages/                             # Page objects
│       ├── BasePage.ts                    # Base page object 
│       ├── CategoriesPage.ts              # Categories page object 
│       ├── CheckoutPage.ts                # Checkout page object
│       ├── CompareProductsPage.ts         # Compare products page object 
│       ├── FiltersPage.ts                 # Filters page object 
│       ├── ProductDetailsPage.ts          # Product details page object  
│       ├── SearchPage.ts                  # Search page object 
│       ├── SocialMediaLinks.ts            # Social media links page object 
│   ├── utils/  
│       ├── networkHelper.ts               # Helper for getting response after sign in
├── tests/                                 # Test specifications
│   ├── cart/                              # Basket related tests
│   ├── compareProducts/                   # Adding products to compare list tests 
│   ├── favoriteList/                      # Favorite list related tests
│   ├── filters/                           # Filter products list tests
│   ├── order/                             # Filling form for creating the order
│   ├── productDetails/                    # Product details page tests
│   ├── search/                            # Search related tests
│   ├── socialMediaLinks/                  # Checking social media links
├── .auth/                                 # Saved authentication states (gitignored)
├── playwright.config.ts                   # Playwright configuration
└── .github/                               # GitHub Actions workflows for CI/CD
    └── workflows/
        └── playwright.yml                 # Playwright test runner workflow
```

## ✨ Features

- ✅ **Cross-browser testing**: Chromium, Firefox, WebKit
- 🧑‍💻 **TypeScript support** for type safety
- 🧰 **Page Object Model (POM)** structure for maintainable code
- 🧷 Automated **screenshots**, **trace**, and **video recording** on failure
- 🔧 Flexible configuration with `.env` for different environments

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/)
- Valid **Allo.ua** credentials (for login flows, etc.)

---

## 📦 Installation

**Clone the repo and install dependencies**

```bash
git clone https://github.com/anna-palamarchuk/allo.e2e.pw.ts.git
cd allo.e2e.pw.ts
npm install
```
