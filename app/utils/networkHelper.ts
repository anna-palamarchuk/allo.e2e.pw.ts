import { Page, expect } from '@playwright/test';

export async function LoginRequest(page: Page) {
    const [loginResponse] = await Promise.all([
        page.waitForResponse((res) =>
            res.url().includes('customer/account/loginPostBeforeAuth') &&
            res.request().method() === 'POST'
        ),
        page.click('//button[contains(., "Увійти")]')
    ]);

    expect(loginResponse.status()).toBe(200);
    return loginResponse;
}
