import {
    EditorSupportedCssDisplay,
    tryParseEditorSupportedCssDisplay
} from "../htmlNativeWrappers/EditorSupportedCssDisplay";
import {
    EditorSupportedFlexDirection,
    tryParseEditorSupportedFlexDirection
} from "../htmlNativeWrappers/EditorSupportedFlexDirection";
import {makeAutoObservable} from "mobx";
import {
    EditorSupportedJustifyContent,
    tryParseEditorSupportedJustifyContent
} from "../htmlNativeWrappers/EditorSupportedJustifyContent";
import {
    EditorSupportedAlignItems,
    tryParseEditorSupportedAlignItems
} from "../htmlNativeWrappers/EditorSupportedAlignItems";

export class NodeStyles {
    private readonly _node: HTMLElement;
    private _cssDisplay: EditorSupportedCssDisplay | undefined;
    private _flexDirection: EditorSupportedFlexDirection | undefined;
    private _justifyContent: EditorSupportedJustifyContent | undefined;
    private _alignItems: EditorSupportedAlignItems | undefined;

    get display(): EditorSupportedCssDisplay | undefined {
        return this._cssDisplay;
    }

    set display(value: EditorSupportedCssDisplay | undefined) {
        this._cssDisplay = value;
        this.setProperty('display', value);
        if (value === EditorSupportedCssDisplay.flex && this._flexDirection === undefined) {
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
        this._cssDisplay = this.extractStyle('display', tryParseEditorSupportedCssDisplay);
        this.initFlexBox();
    }

    private setProperty(propertyName: string, value: string | undefined) {
        this._node.style.setProperty(propertyName, value ?? null);
    }

    private initFlexBox() {
        this._flexDirection = this.extractStyle('flex-direction', tryParseEditorSupportedFlexDirection);
        this._justifyContent = this.extractStyle('justify-content', tryParseEditorSupportedJustifyContent);
        this._alignItems = this.extractStyle('align-items', tryParseEditorSupportedAlignItems);
    }

    private extractStyle<T>(key: string, parseFn: (val: string) => T | undefined): T | undefined {
        return parseFn(getComputedStyle(this._node).getPropertyValue(key));
    }
}