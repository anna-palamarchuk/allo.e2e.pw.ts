🚀 Allo E2E Test Automation

[![Build Status](https://img.shields.io/github/actions/workflow/status/anna-palamarchuk/allo.e2e.pw.ts/ci.yml?branch=main&label=CI&logo=github)](https://github.com/anna-palamarchuk/allo.e2e.pw.ts/actions)
[![Playwright](https://img.shields.io/badge/Playwright-1.40-blue)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern **end-to-end testing** framework using **Playwright** and **TypeScript** for the [Allo](https://allo.ua) platform.

---

## 🌟 Project structure
allo.e2e.pw.ts/
├── .github/                  # GitHub Actions workflows
│   └── workflows/
│       └── playwright.yml
├── tests/                    # All test files grouped by feature or page
│   ├── home.spec.ts
│   ├── login.spec.ts
│   └── cart.spec.ts
├── pages/                    # Page Object Models for each key page
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   └── CartPage.ts
├── modals/                   # Modal components (if used in POM)
│   └── CartModal.ts
├── utils/                    # Utility functions, helpers, and data factories
│   ├── auth.ts
│   └── testData.ts
├── storage/                  # Authenticated session storage files
│   └── state.json
├── .env                      # Environment variables (local only, gitignored)
├── .gitignore                # Ignore build files, node_modules, etc.
├── playwright.config.ts      # Playwright configuration file
├── package.json              # NPM scripts and dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
---

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
