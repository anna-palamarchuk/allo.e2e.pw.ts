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

      expect(ariaLabel, `Missing aria-label on social media link at index ${i}`).toBeTruthy();

      const expectedUrl = this.expectedUrls[ariaLabel ?? ''];
      expect(expectedUrl, `Missing expected URL for aria-label: ${ariaLabel}`).toBeTruthy();

      const href = await link.getAttribute('href');
      expect(href, `Missing href for social media link with aria-label: ${ariaLabel}`).toBeTruthy();

      expect(href).toContain(expectedUrl);
    }
  }
}
