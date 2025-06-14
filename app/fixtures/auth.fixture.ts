import { test as baseFixture } from '../fixtures/fixture';
import fs from 'fs';
import path from 'path';
import { SignInModal } from '../modals/SignInModal';
import { LoginRequest } from '../utils/networkHelper';

export const test = baseFixture
    .extend<unknown, { workerStorageState: string }>({
        workerStorageState: [async ({ browser }, use, workerInfo) => {
            const workerStorageState = path.resolve(__dirname, `../storageState/.auth/auth-worker-${workerInfo.workerIndex}.json`);
            if (fs.existsSync(workerStorageState)) {
                fs.rmSync(workerStorageState);
            }

            const context = await browser.newContext();
            const loginPage = await context.newPage();
            await loginPage.goto('https://allo.ua/ua/');

            const signInModal = new SignInModal(loginPage);
            await signInModal.clickOnProfileButton();
            await signInModal.waitForSignInMenuIsVisible();
            await signInModal.clickOnLoginAndPassButton();
            await signInModal.fillSignInForm();

            await LoginRequest(loginPage);
            await context.storageState({ path: workerStorageState });
            await context.close();
            await use(workerStorageState);
            fs.rmSync(workerStorageState);

        }, { scope: 'worker', auto: true }],
        storageState: ({ workerStorageState }, use) => use(workerStorageState),
    });