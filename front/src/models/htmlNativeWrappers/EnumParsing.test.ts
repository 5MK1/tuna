import {EditorSupportedCssDisplay, EditorSupportedFlexDirection, isAllowedCssRule} from "./editorSupportedCssValues";

test(
    'isAllowedCssRule for "display" rule return correct value by correct input',
    () => {
        const enumKey = isAllowedCssRule<EditorSupportedCssDisplay>('display', 'flex');
        expect(enumKey).toBe('flex');
    }
);

test(
    'isAllowedCssRule for "display" rule return undefined by incorrect input',
    () => {
        const enumKey = isAllowedCssRule<EditorSupportedCssDisplay>('display', 'WRONG_CSS_DISPLAY_VALUE');
        expect(enumKey).toBeUndefined();
    }
);

test(
    'isAllowedCssRule for "flex-direction" rule return correct value by correct input',
    () => {
        const enumKey = isAllowedCssRule<EditorSupportedFlexDirection>('flexDirection', 'row');
        expect(enumKey).toBe('row');
    }
);

test(
    'isAllowedCssRule for "flex-direction" rule return undefined by incorrect input',
    () => {
        const enumKey = isAllowedCssRule<EditorSupportedFlexDirection>('flexDirection', 'row-reverse');
        expect(enumKey).toBe('row-reverse');
    }
);