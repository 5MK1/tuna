import {expect, test as base} from "@playwright/test";
import {HomePage, LoginPage} from "../pages/LoginPage";
import {goToCustomPage} from "../pages/GoToCustomPage";

const correctLogin = 'myLongUserName_12345';

const test = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({page}, use) => {
        const loginPage = await goToCustomPage(LoginPage, page);
        await use(loginPage);
    }
})

async function doCorrectLogin(loginPage: LoginPage): Promise<HomePage> {
    await loginPage.userNameInput.fill(correctLogin);
    await loginPage.passwordInput.fill('$$goodPassword_12345##');

    await loginPage.submitButton.click();
    return await loginPage.toPage(HomePage);
}

test.describe('Login page', () => {
    test(
        'Should change userName input border color when userName and password inputs is empty',
        async ({loginPage}) => {
            const userNameBorderColorBeforeSubmit = await loginPage.userNameInput.getBorderColor();

            await loginPage.submitButton.click();

            const userNameBorderColorAfterSubmit = await loginPage.userNameInput.getBorderColor();
            await expect(userNameBorderColorAfterSubmit).not.toBe(userNameBorderColorBeforeSubmit);
        }
    );

    test(
        'Should change userName input border color when userName is too short',
        async ({loginPage}) => {
            await loginPage.userNameInput.fill('a');
            const userNameBorderColorBeforeSubmit = await loginPage.userNameInput.getBorderColor();

            await loginPage.submitButton.click();

            const userNameBorderColorAfterSubmit = await loginPage.userNameInput.getBorderColor();
            await expect(userNameBorderColorAfterSubmit).not.toBe(userNameBorderColorBeforeSubmit);
        }
    );

    test(
        'Should change password border color when password is empty',
        async ({loginPage}) => {
            await loginPage.userNameInput.fill(correctLogin);
            const userNameBorderColorBeforeSubmit = await loginPage.passwordInput.getBorderColor();

            await loginPage.submitButton.click();

            const userNameBorderColorAfterSubmit = await loginPage.passwordInput.getBorderColor();
            await expect(userNameBorderColorAfterSubmit).not.toBe(userNameBorderColorBeforeSubmit);
        }
    );

    test(
        'Should change password border color when password is too short',
        async ({loginPage}) => {
            await loginPage.userNameInput.fill(correctLogin);
            await loginPage.passwordInput.fill('a');
            const userNameBorderColorBeforeSubmit = await loginPage.passwordInput.getBorderColor();

            await loginPage.submitButton.click();

            const userNameBorderColorAfterSubmit = await loginPage.passwordInput.getBorderColor();
            await expect(userNameBorderColorAfterSubmit).not.toBe(userNameBorderColorBeforeSubmit);
        }
    );

    test(
        'Should redirect to home page when login successfully',
        async ({loginPage}) => {
            const homePage = await doCorrectLogin(loginPage);

            await expect(homePage.greetingMessage).toBeVisible();
            await expect(homePage.greetingMessage).toContainText(correctLogin);
            await expect(homePage.topNavigation.editorLink).toBeVisible();
            await expect(homePage.topNavigation.logoutLink).toBeVisible();
        }
    );

    test(
        'Should keep logged in after successful login and page reloaded',
        async ({loginPage}) => {
            const homePage = await doCorrectLogin(loginPage);
            await homePage.page.reload();

            await expect(homePage.greetingMessage).toBeVisible();
            await expect(homePage.greetingMessage).toContainText(correctLogin);
            await expect(homePage.topNavigation.editorLink).toBeVisible();
            await expect(homePage.topNavigation.logoutLink).toBeVisible();
        }
    );
});