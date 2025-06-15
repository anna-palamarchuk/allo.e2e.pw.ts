🚀 Allo E2E Test Automation

[![Build Status](https://img.shields.io/github/actions/workflow/status/anna-palamarchuk/allo.e2e.pw.ts/ci.yml?branch=main&label=CI&logo=github)](https://github.com/anna-palamarchuk/allo.e2e.pw.ts/actions)
[![Playwright](https://img.shields.io/badge/Playwright-1.40-blue)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern **end-to-end testing** framework using **Playwright** and **TypeScript** for the [Allo](https://allo.ua) platform.

---

## 🌟 Project structure
... bash
allo.e2e.pw.ts/
├── .github/
│   └── workflows/
│       └── playwright.yml      # CI pipeline for E2E tests
├── tests/                      # Playwright spec files by feature
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   └── ...                     # additional test suites
├── pages/                      # Page Object Models (POM)
│   ├── LoginPage.ts
│   ├── CartPage.ts
│   └── ...                     # more page classes
├── modals/                     # Shared modal components for POM
│   └── CartModal.ts
├── utils/                      # Helpers: auth, test data, etc.
│   ├── authHelper.ts
│   └── testData.ts
├── storage/                    # Saved states (e.g., auth/session)
│   └── state.json
├── playwright.config.ts        # Playwright config and project definitions
├── .env                        # Local environment (gitignored)
├── package.json                # Dependencies & npm scripts
├── tsconfig.json               # TypeScript settings
└── README.md                   # Documentation and usage guide
...
## ✨ Features

- ✅ **Cross-browser testing**: Chromium, Firefox, WebKit
- 🧑‍💻 **TypeScript support** for type safety
- 🧰 **Page Object Model (POM)** structure for maintainable code
- 🧷 Automated **screenshots**, **trace**, and **video recording** on failure
- 🔧 Flexible configuration with `.env` for different environments

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- Valid **Allo.ua** credentials (for login flows, etc.)

---

## 📦 Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/anna-palamarchuk/allo.e2e.pw.ts.git
   cd allo.e2e.pw.ts
   ```
