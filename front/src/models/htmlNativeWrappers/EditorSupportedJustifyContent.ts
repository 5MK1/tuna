import {getEnumKeyByValue} from "./getEnumKeyByValue";

export enum EditorSupportedJustifyContent {
    flexStart = 'flex-start',
    flexEnd = 'flex-end',
    center = 'center',
    spaceBetween = 'space-between',
    spaceAround = 'space-around'
}

export function tryParseEditorSupportedJustifyContent(value: string): EditorSupportedJustifyContent | undefined {
    // browsers uses `normal` value as initial, replace it with W3C `initial value`
    if (value === 'normal') {
        return EditorSupportedJustifyContent.flexStart;
    }

    const key = getEnumKeyByValue(EditorSupportedJustifyContent, value);
    return key === undefined
        ? undefined
        : EditorSupportedJustifyContent[key];
}