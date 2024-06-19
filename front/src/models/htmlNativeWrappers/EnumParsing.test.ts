import {EditorSupportedCssDisplay, tryParseEditorSupportedCssDisplay} from "./EditorSupportedCssDisplay";
import {EditorSupportedFlexDirection, tryParseEditorSupportedFlexDirection} from "./EditorSupportedFlexDirection";

test(
    'tryParseEditorSupportedCssDisplay return correct key by existing value',
    () => {
        const enumKey = tryParseEditorSupportedCssDisplay('flex');
        expect(enumKey).toBe(EditorSupportedCssDisplay.flex);
    }
);

test(
    'tryParseEditorSupportedCssDisplay return undefined by not existing value',
    () => {
        const enumKey = tryParseEditorSupportedCssDisplay('WRONG_CSS_DISPLAY_VALUE');
        expect(enumKey).toBeUndefined();
    }
);

test(
    'tryParseEditorSupportedFlexDirection return correct key by existing single word value',
    () => {
        const enumKey = tryParseEditorSupportedFlexDirection('row');
        expect(enumKey).toBe(EditorSupportedFlexDirection.row);
    }
);

test(
    'tryParseEditorSupportedFlexDirection return correct key by existing two word value',
    () => {
        const enumKey = tryParseEditorSupportedFlexDirection('row-reverse');
        expect(enumKey).toBe(EditorSupportedFlexDirection.rowReverse);
    }
);