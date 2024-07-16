import {Locator, Page} from "@playwright/test";

export class TopNavigation {
    public readonly homeLink: Locator;
    public readonly loginLink: Locator;
    public readonly editorLink: Locator;
    public readonly logoutLink: Locator;

    constructor(page: Page) {
        this.homeLink = page.getByTestId('tn__home-link');
        this.loginLink = page.getByTestId('tn__login-link');
        this.editorLink = page.getByTestId('tn__editor-link');
        this.logoutLink = page.getByTestId('tn__logout-link');
    }
}