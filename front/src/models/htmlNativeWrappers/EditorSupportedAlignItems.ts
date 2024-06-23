import {getEnumKeyByValue} from "./getEnumKeyByValue";

export enum EditorSupportedAlignItems {
    stretch = 'stretch',
    flexStart = 'flex-start',
    flexEnd = 'flex-end',
    center = 'center',
}

export function tryParseEditorSupportedAlignItems(value: string): EditorSupportedAlignItems | undefined {
    if (value === 'normal') {
        return EditorSupportedAlignItems.stretch;
    }
    const key = getEnumKeyByValue(EditorSupportedAlignItems, value);
    return key === undefined
        ? undefined
        : EditorSupportedAlignItems[key];
}