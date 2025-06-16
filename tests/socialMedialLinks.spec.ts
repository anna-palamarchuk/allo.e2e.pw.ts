import { test } from "../app/fixtures/fixture";

test.describe('Social medial links suite', () => {
    test(`A11 Check socila media links}`, async ({ socialMediaLinks }) => {
        await test.step('Verify social medial links section', async () => {
            await socialMediaLinks.verifySocialMediaSection;
        });
        await test.step('Verify links from social section', async () => {
            await socialMediaLinks.verifyAllSocialMediaLinks();
        });
    });
});

