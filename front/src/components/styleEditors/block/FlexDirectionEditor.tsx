import {StyleEditorProps} from "./StyleEditorProps";
import PicRadioGroup from "../../ui/formControllers/picRadioGroup";
import {
    EditorSupportedFlexDirection,
    tryParseEditorSupportedFlexDirection
} from "../../../models/htmlNativeWrappers/EditorSupportedFlexDirection";
import {observer} from "mobx-react-lite";

const flexDirectionOptions = [
    { path: 'flex-direction--row.svg', value: EditorSupportedFlexDirection.row },
    { path: 'flex-direction--row-reverse.svg', value: EditorSupportedFlexDirection.rowReverse },
    { path: 'flex-direction--column.svg', value: EditorSupportedFlexDirection.column },
    { path: 'flex-direction--column-reverse.svg', value: EditorSupportedFlexDirection.columnReverse },
];

const FlexDirectionEditor = observer((props: StyleEditorProps) => {
    function valueChanged(value: string) {
        props.style.flexDirection = tryParseEditorSupportedFlexDirection(value);
    }

    return (<>
        <strong>{props.style.flexDirection}</strong>
        <PicRadioGroup items={flexDirectionOptions}
                       value={props.style.flexDirection}
                       onChange={valueChanged}/>
    </>);
});

export default FlexDirectionEditor;