const display = ['none', 'contents', 'block', 'inline', 'flex', 'grid'];
const alignItems = ['stretch', 'flex-start', 'flex-end', 'center'];
const flexDirection = ['row', 'row-reverse', 'column', 'column-reverse']
const justifyContent = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
export type EditorSupportedCssDisplay = typeof display[number];
export type EditorSupportedAlignItems = typeof alignItems[number];
export type EditorSupportedFlexDirection = typeof flexDirection[number];
export type EditorSupportedJustifyContent = typeof justifyContent[number];

const editorAllowedCssValues = {
    display,
    alignItems,
    flexDirection,
    justifyContent
};

export type EditorAllowedCssKey = keyof typeof editorAllowedCssValues;

export function isAllowedCssRule<T extends string>(key: EditorAllowedCssKey, value: string): T | undefined {
    return (key in editorAllowedCssValues) && (editorAllowedCssValues[key]).includes(value)
        ? value as T
        : undefined;
}