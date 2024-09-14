import {
    EditorAllowedCssValuesKey,
    EditorSupportedAlignItems,
    EditorSupportedCssDisplay,
    EditorSupportedFlexDirection, EditorSupportedJustifyContent, isAllowedCssRule, isEditorAllowedCssValuesKey
} from "../htmlNativeWrappers/editorSupportedCssValues";
import {makeAutoObservable} from "mobx";
import kebabCase from "kebab-case";
import {CssBorder2} from "../htmlNativeWrappers/CssBorder";
import {CSSProperties} from "react";

export class TunaStylesDeclaration {
    public display: EditorSupportedCssDisplay | undefined;
    public alignItems: EditorSupportedAlignItems | undefined;
    public flexDirection: EditorSupportedFlexDirection | undefined;
    public justifyContent: EditorSupportedJustifyContent | undefined;
    public border: CssBorder2 | undefined;
    public padding: string | undefined;
    public margin: string | undefined;

    constructor() {
    }
}

export class TunaNodeStyles {
    public declaration: TunaStylesDeclaration;

    constructor() {
        makeAutoObservable(this);
        this.declaration = new TunaStylesDeclaration();
    }

    setValues(newValues: Partial<TunaStylesDeclaration>): void {
        this.declaration = {...this.declaration, ...newValues};
    }

    extractStyleFrom(element: HTMLElement) {
        this.declaration.display = TunaNodeStyles.extractStyle('display', element);
        this.declaration.flexDirection = TunaNodeStyles.extractStyle('flexDirection', element);
        this.declaration.justifyContent = TunaNodeStyles.extractStyle('justifyContent', element, TunaNodeStyles.replaceNormalTo('flex-start'));
        this.declaration.alignItems = TunaNodeStyles.extractStyle('alignItems', element, TunaNodeStyles.replaceNormalTo('stretch'));
    }

    getProperties(): CSSProperties {
        const {border: border, ...stringsDeclaration} = this.declaration;
        return {border: border?.toCssString(), ...stringsDeclaration } as CSSProperties;
    }

    private static extractStyle<T extends string>(
        editorAllowedStyleKey: EditorAllowedCssValuesKey,
        element: HTMLElement,
        convertFn?: (value: string) => T
    ): T | undefined {
        const cssKebabKey = kebabCase(editorAllowedStyleKey)!;
        const computedStyleValue = getComputedStyle(element).getPropertyValue(cssKebabKey);

        // remove this call and method
        return isAllowedCssRule<T>(
            editorAllowedStyleKey,
            convertFn === undefined ? computedStyleValue : convertFn(computedStyleValue)
        );
    }

    private static replaceNormalTo<T>(replacement: T): (val: string) => T {
        return function (val: string): T {
            return val === 'normal' ? replacement : val as T;
        }
    }
}