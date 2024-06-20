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

export class NodeStyles {
    private readonly _node: HTMLElement;
    private _cssDisplay: EditorSupportedCssDisplay | undefined;
    private _flexDirection: EditorSupportedFlexDirection | undefined;
    private _justifyContent: EditorSupportedJustifyContent | undefined;

    get display(): EditorSupportedCssDisplay | undefined {
        return this._cssDisplay;
    }

    set display(value: EditorSupportedCssDisplay | undefined) {
        this._cssDisplay = value;
        this._node.style.setProperty('display', value ?? null);
        if (value === EditorSupportedCssDisplay.flex && this._flexDirection === undefined) {
            this._flexDirection = this.extractStyle('flex-direction', tryParseEditorSupportedFlexDirection);
            this._justifyContent = this.extractStyle('justify-content', tryParseEditorSupportedJustifyContent);
        }
    }

    get flexDirection(): EditorSupportedFlexDirection | undefined {
        return this._flexDirection;
    }

    set flexDirection(value: EditorSupportedFlexDirection | undefined) {
        this._flexDirection = value;
        this._node.style.setProperty('flex-direction', value ?? null);
    }

    get justifyContent(): EditorSupportedJustifyContent | undefined {
        return this._justifyContent;
    }

    set justifyContent(value: EditorSupportedJustifyContent | undefined) {
        this._justifyContent = value;
        this._node.style.setProperty('justify-content', value ?? null);
    }

    constructor(node: HTMLElement) {
        makeAutoObservable(this);
        this._node = node;
        this._cssDisplay = this.extractStyle('display', tryParseEditorSupportedCssDisplay);
        this._flexDirection = this.extractStyle('flex-direction', tryParseEditorSupportedFlexDirection);
        this._justifyContent = this.extractStyle('justify-content', tryParseEditorSupportedJustifyContent);
    }

    private extractStyle<T>(key: string, parseFn: (val: string) => T | undefined): T | undefined {
        return parseFn(getComputedStyle(this._node).getPropertyValue(key));
    }
}