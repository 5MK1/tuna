import {makeAutoObservable} from "mobx";
import {
    EditorAllowedCssValuesKey, EditorSupportedAlignItems,
    EditorSupportedCssDisplay, EditorSupportedFlexDirection, EditorSupportedJustifyContent,
    isAllowedCssRule
} from "../htmlNativeWrappers/editorSupportedCssValues";
import kebabCase from "kebab-case";

export class NodeStyles {
    private readonly _node: HTMLElement;

    private _cssDisplay: EditorSupportedCssDisplay | undefined;
    private _flexDirection: EditorSupportedFlexDirection | undefined;
    private _alignItems: EditorSupportedAlignItems | undefined;
    private _justifyContent: EditorSupportedJustifyContent | undefined;

    get display(): EditorSupportedCssDisplay | undefined {
        return this._cssDisplay;
    }

    set display(value: EditorSupportedCssDisplay | undefined) {
        this._cssDisplay = value;
        this.setProperty('display', value);
        if (value === 'flex' && this._flexDirection === undefined) {
            this.initFlexBox();
        }
    }

    get flexDirection(): EditorSupportedFlexDirection | undefined {
        return this._flexDirection;
    }

    set flexDirection(value: EditorSupportedFlexDirection | undefined) {
        this._flexDirection = value;
        this.setProperty('flex-direction', value);
    }

    get justifyContent(): EditorSupportedJustifyContent | undefined {
        return this._justifyContent;
    }

    set justifyContent(value: EditorSupportedJustifyContent | undefined) {
        this._justifyContent = value;
        this.setProperty('justify-content', value);
    }

    get alignItems(): EditorSupportedAlignItems | undefined {
        return this._alignItems;
    }

    set alignItems(value: EditorSupportedAlignItems | undefined) {
        this._alignItems = value;
        this.setProperty('align-items', value);
    }

    constructor(node: HTMLElement) {
        makeAutoObservable(this);
        this._node = node;
        this._cssDisplay = this.extractStyle('display');
        this.initFlexBox();
    }

    private setProperty(propertyName: string, value: string | undefined) {
        this._node.style.setProperty(propertyName, value ?? null);
    }

    private initFlexBox() {
        this._flexDirection = this.extractStyle('flexDirection');
        this._justifyContent = this.extractStyle('justifyContent', this.replaceNormalTo('flex-start'));
        this._alignItems = this.extractStyle('alignItems', this.replaceNormalTo('stretch'));
    }

    private extractStyle<T extends string>(
        editorAllowedStyleKey: EditorAllowedCssValuesKey,
        convertFn?: (value: string) => T
    ): T | undefined {
        const cssKebabKey = kebabCase(editorAllowedStyleKey)!;
        const computedStyleValue = getComputedStyle(this._node).getPropertyValue(cssKebabKey);
        return isAllowedCssRule<T>(
            editorAllowedStyleKey,
            convertFn === undefined ? computedStyleValue : convertFn(computedStyleValue)
        );
    }

    private replaceNormalTo<T extends string>(replacement: T): (val: string) => T {
        return function (val: string): T {
            return val === 'normal' ? replacement : val as T;
        }
    }
}