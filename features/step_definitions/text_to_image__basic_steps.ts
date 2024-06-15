import {Browser, chromium, expect, Page} from "@playwright/test";
import {Given, When, Then, setDefaultTimeout, AfterAll} from '@cucumber/cucumber';

let browser: Browser;
let page: Page;
let prompt: string;

setDefaultTimeout(60 * 1000);

Given('a logged in user', async function () {
    const username: string = 'szliaw@gmail.com'
    const password: string = 'Password123!'

    browser = await chromium.launch({headless: false})
    page = await browser.newPage()
    await page.goto('https://app.leonardo.ai/auth/login')

    await page.getByRole('textbox', {name: 'email'}).fill(username)
    await page.getByRole('textbox', {name: 'Password'}).fill(password)
    await page.getByRole('button', {name: 'Sign in'}).click();

    await expect(page).toHaveTitle('Home - Leonardo.Ai');
    await expect(page).toHaveURL('https://app.leonardo.ai/');
});

When('the Image Generation page', async function () {
    // close Getting Started modal #1
    await page.getByRole('button', {name: 'Maybe Later'}).click()

    await page.getByText('Image Generation').first().click()
    await expect(page).toHaveTitle('Image Generation - Leonardo.Ai');
    await expect(page).toHaveURL('https://app.leonardo.ai/image-generation');

    // close Getting Started modal #2
    await page.getByLabel('Close').click()
    // close Intro Guide modal
    await page.getByLabel('Close').click()
});

When('the {string} preset', async function (preset) {
    await page.getByText('Preset', {exact:true}).click()
    await page.locator('button', {hasText: preset}).click()
    await page.getByRole('button', {name: 'Close panel'}).click()
});

When('Fast mode turned on', async function () {
    await page.getByRole('button', {name: 'Fast'}).click()
});

When('a prompt of {string}', async function (featurePrompt) {
    prompt = featurePrompt;
    await page.getByPlaceholder('Type a prompt ...').fill(prompt)
});

When('image dimensions of {string}', async function (size) {
    await page.getByRole('button', {name: size}).click()
});

When('aspect ratio is 1:1', async function () {
    await page.getByRole('button', {name: '1:1'}).click()
});

When('Number of images is 4', async function () {
    await page.getByRole('button', {name: '4', exact: true}).click()
});

When('the generate button is clicked', async function () {
    await page.locator('button', {hasText: 'Generate'}).click()
});

Then('the generated image displays successfully', async function () {
    const generatedImages = page.getByAltText(prompt)
    await expect(generatedImages).toHaveCount(4, {timeout: 20000})
});

AfterAll(async function () {
    //TODO screenshot timing out
    // Open issue https://github.com/microsoft/playwright/issues/28995
    //await page.screenshot({ path: 'screenshot.png' });

    await browser.close()
});