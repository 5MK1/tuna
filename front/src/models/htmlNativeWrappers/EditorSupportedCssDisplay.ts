export enum EditorSupportedCssDisplay {
    none = 'none',
    contents = 'contents',
    block = 'block',
    inline = 'inline',
    flex = 'flex',
    grid = 'grid',
}

export function tryParseEditorSupportedCssDisplay(key: string): EditorSupportedCssDisplay | undefined {
    return EditorSupportedCssDisplay[key as keyof typeof EditorSupportedCssDisplay];
}