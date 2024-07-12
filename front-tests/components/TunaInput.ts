import {Locator, Page} from "@playwright/test";

export function wrapperTid(baseTid: string) {
    return `${baseTid}--wrapper`;
}

export class TunaInput {
    public readonly nativeInput: Locator;
    public readonly inputWrapper: Locator;

    constructor(page: Page, tid: string) {
        this.nativeInput = page.getByTestId(tid);
        this.inputWrapper = page.getByTestId(wrapperTid(tid));
    }

    public fill(value: string): Promise<void> {
        return this.nativeInput.fill(value);
    }

    public getBorderColor(): Promise<string> {
        return this.inputWrapper
            .evaluate(wrapper => {
                return getComputedStyle(wrapper)
                    .getPropertyValue('border-color');
            })
    }
}