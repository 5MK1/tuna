import {getEnumKeyByValue} from "./getEnumKeyByValue";

export enum EditorSupportedFlexDirection {
    row = 'row',
    rowReverse = 'row-reverse',
    column = 'column',
    columnReverse = 'column-reverse'
}

export function tryParseEditorSupportedFlexDirection(value: string): EditorSupportedFlexDirection | undefined {
    const key = getEnumKeyByValue(EditorSupportedFlexDirection, value);
    return key === undefined
        ? undefined
        : EditorSupportedFlexDirection[key];
}