import {
    EditorSupportedCssDisplay,
    tryParseEditorSupportedCssDisplay
} from "../htmlNativeWrappers/EditorSupportedCssDisplay";
import {
    EditorSupportedFlexDirection,
    tryParseEditorSupportedFlexDirection
} from "../htmlNativeWrappers/EditorSupportedFlexDirection";
import {makeAutoObservable} from "mobx";

export class NodeStyles {
    private readonly _node: HTMLElement;
    private _cssDisplay: EditorSupportedCssDisplay | undefined;
    private _flexDirection: EditorSupportedFlexDirection | undefined;

    get display(): EditorSupportedCssDisplay | undefined {
        return this._cssDisplay;
    }

    set display(value: EditorSupportedCssDisplay | undefined) {
        this._cssDisplay = value;
        this._node.style.setProperty('display', value ?? null);
        if (value === EditorSupportedCssDisplay.flex && this._flexDirection === undefined) {
            this._flexDirection = this.extractStyle('flex-direction', tryParseEditorSupportedFlexDirection);
        }
    }

    get flexDirection(): EditorSupportedFlexDirection | undefined {
        return this._flexDirection;
    }

    set flexDirection(value: EditorSupportedFlexDirection | undefined) {
        this._flexDirection = value;
        this._node.style.setProperty('flex-direction', value ?? null);
    }

    constructor(node: HTMLElement) {
        makeAutoObservable(this);
        this._node = node;
        this._cssDisplay = this.extractStyle('display', tryParseEditorSupportedCssDisplay);
        this._flexDirection = this.extractStyle('flex-direction', tryParseEditorSupportedFlexDirection);
    }

    private extractStyle<T>(key: string, parseFn: (val: string) => T | undefined): T | undefined {
        return parseFn(getComputedStyle(this._node).getPropertyValue(key));
    }
}