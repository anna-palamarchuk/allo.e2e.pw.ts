import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SocialMediaLinks extends BasePage {
  private socialMediaTitle: Locator;
  private socialMediaLinks: Locator;

  private expectedUrls: { [label: string]: string } = {
    facebook: 'https://www.facebook.com/allo',
    instagram: 'https://www.instagram.com/allo/',
    telegram: 'https://t.me/allonews',
    youtube: 'https://www.youtube.com/user/allouavideo',
    tiktok: 'https://www.tiktok.com/@allo.official'
  };

  constructor(page: Page) {
    super(page);
    this.socialMediaTitle = page.locator('.social-list__subtitle');
    this.socialMediaLinks = page.locator('.social-list__content a');
  }

  async verifySocialMediaSection() {
    await expect(this.socialMediaTitle).toContainText('АЛЛО у соціальних мережах');
  }

  async verifyAllSocialMediaLinks() {
    const count = await this.socialMediaLinks.count();

    for (let i = 0; i < count; i++) {
      const link = this.socialMediaLinks.nth(i);
      const ariaLabel = await link.getAttribute('aria-label');
      const expectedUrl = this.expectedUrls[ariaLabel];
      const [socialPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        link.click()
      ]);
      await socialPage.waitForLoadState();
      const actualUrl = socialPage.url();
      if (ariaLabel === 'instagram') {
        const urlObj = new URL(actualUrl);
        const nextParam = urlObj.searchParams.get('next');
        if (nextParam) {
          expect(decodeURIComponent(nextParam)).toContain('/allo/');
        } else {
          expect(actualUrl).toContain('/allo/');
        }
      } else {
        expect(actualUrl).toContain(expectedUrl);
      }

      await socialPage.close();
    }
  }
}
