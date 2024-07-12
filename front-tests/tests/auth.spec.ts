import {expect, test as base} from "@playwright/test";
import {HomePage, LoginPage} from "../pages/LoginPage";
import {goToCustomPage} from "../pages/GoToCustomPage";


const test = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({page}, use) => {
        const loginPage = await goToCustomPage(LoginPage, page);
        await use(loginPage);
    }
})


test.describe('Login page', () => {
    test(
        'Should change userName input border color when userName and password inputs is empty',
        async ({loginPage}) => {
            const userNameBorderColorBeforeSubmit = await loginPage.userNameInput.getBorderColor();

            await loginPage.submitButton.click();

            const userNameBorderColorAfterSubmit =  await loginPage.userNameInput.getBorderColor();
            await expect(userNameBorderColorAfterSubmit).not.toBe(userNameBorderColorBeforeSubmit);
        }
    );

    test(
        'Should change userName input border color when userName is too short',
        async ({loginPage}) => {
            await loginPage.userNameInput.fill('a');
            const userNameBorderColorBeforeSubmit = await loginPage.userNameInput.getBorderColor();

            await loginPage.submitButton.click();

            const userNameBorderColorAfterSubmit =  await loginPage.userNameInput.getBorderColor();
            await expect(userNameBorderColorAfterSubmit).not.toBe(userNameBorderColorBeforeSubmit);
        }
    );

    test(
        'Should change password border color when password is empty',
        async ({loginPage}) => {
            await loginPage.userNameInput.fill('myLongUserName_12345');
            const userNameBorderColorBeforeSubmit = await loginPage.passwordInput.getBorderColor();

            await loginPage.submitButton.click();

            const userNameBorderColorAfterSubmit =  await loginPage.passwordInput.getBorderColor();
            await expect(userNameBorderColorAfterSubmit).not.toBe(userNameBorderColorBeforeSubmit);
        }
    );

    test(
        'Should change password border color when password is too short',
        async ({loginPage}) => {
            await loginPage.userNameInput.fill('myLongUserName_12345');
            await loginPage.passwordInput.fill('a');
            const userNameBorderColorBeforeSubmit = await loginPage.passwordInput.getBorderColor();

            await loginPage.submitButton.click();

            const userNameBorderColorAfterSubmit =  await loginPage.passwordInput.getBorderColor();
            await expect(userNameBorderColorAfterSubmit).not.toBe(userNameBorderColorBeforeSubmit);
        }
    );

    test(
        'Should redirect to home page when login successfully',
        async ({loginPage}) => {
            await loginPage.userNameInput.fill('myLongUserName_12345');
            await loginPage.passwordInput.fill('$$goodPassword_12345##');

            await loginPage.submitButton.click();

            const homePage = await loginPage.toPage(HomePage);
            await expect(homePage.greetingMessage).toBeVisible();
            await expect(homePage.greetingMessage).toContainText('myLongUserName_12345');
            await expect(homePage.topNavigation.editorLink).toBeVisible();
        }
    )
});