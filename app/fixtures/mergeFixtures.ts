import { mergeTests } from '@playwright/test';
import { test as loginFixture } from "../fixtures/auth.fixture";
import { test as baseFixture } from "../fixtures/fixture";

export const test = mergeTests(loginFixture, baseFixture);