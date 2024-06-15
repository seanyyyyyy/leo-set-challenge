### Setup
1. Pull repo
2. `npm install`
3. `npx playwright install`
4. (Optional) Modify login variables in `text_to_image_basic.steps`
5. (Optional) Modify generation variables in `text_to_image_basic.feature`
6. `npm run test`

### Notes / improvements
* Improve validation of generated images or clear user generated image history. Currently it waits for the appearance of 4 images with the prompt as alt tags, however if the user already has images generated from the same prompt this check will immediately pass.
* Take a screenshot of the final state when images appear (currently seems to time out due to an open issue in Playwright waiting for something to load on the page https://github.com/microsoft/playwright/issues/28995)
* Split out login into auth state `playwright.dev/docs/auth`