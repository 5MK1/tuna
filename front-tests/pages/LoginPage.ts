import {TunaInput} from "../components/TunaInput";
import {Locator, Page, Response} from "@playwright/test";
import {PageBase} from "./PageBase";

export class LoginPage extends PageBase {
    public readonly url: string = '/login'
    public readonly userNameInput: TunaInput;
    public readonly passwordInput: TunaInput;
    public readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.userNameInput = new TunaInput(page, 'userName');
        this.passwordInput = new TunaInput(page, 'password');
        this.submitButton = page.getByTestId('submitLoginForm');
    }

    public goto(): Promise<null | Response> {
        return this.page.goto(this.url);
    }
}

export class HomePage extends PageBase {
    public readonly url: string = '/';
    public readonly greetingMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.greetingMessage = page.getByTestId('greeting-message');
    }

    goto(): Promise<Response | null> {
        return this.page.goto(this.url);
    }
}