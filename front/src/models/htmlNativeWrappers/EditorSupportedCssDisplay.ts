import {getEnumKeyByValue} from "./getEnumKeyByValue";

export enum EditorSupportedCssDisplay {
    none = 'none',
    contents = 'contents',
    block = 'block',
    inline = 'inline',
    flex = 'flex',
    grid = 'grid',
}

export function tryParseEditorSupportedCssDisplay(value: string): EditorSupportedCssDisplay | undefined {
    const key = getEnumKeyByValue(EditorSupportedCssDisplay, value);
    return key === undefined
        ? undefined
        : EditorSupportedCssDisplay[key];
}