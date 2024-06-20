import {observer} from "mobx-react-lite";
import {StyleEditorProps} from "./StyleEditorProps";
import {
    EditorSupportedJustifyContent,
    tryParseEditorSupportedJustifyContent
} from "../../../models/htmlNativeWrappers/EditorSupportedJustifyContent";
import PicRadioGroup from "../../ui/formControllers/picRadioGroup";

const options = [
    {path: 'justify-content--flex-start.svg', value: EditorSupportedJustifyContent.flexStart},
    {path: 'justify-content--flex-end.svg', value: EditorSupportedJustifyContent.flexEnd},
    {path: 'justify-content--center.svg', value: EditorSupportedJustifyContent.center},
    {path: 'justify-content--space-between.svg', value: EditorSupportedJustifyContent.spaceBetween},
    {path: 'justify-content--space-around.svg', value: EditorSupportedJustifyContent.spaceAround}
];

const JustifyContentEditor = observer((props: StyleEditorProps) => {
    function valueChanged(value: string) {
        props.style.justifyContent = tryParseEditorSupportedJustifyContent(value);
    }

    return (<>
        <div className="sidebar-form-item">
            <label className="sidebar-form-item__label">justify&nbsp;content:</label>
            <strong className="sidebar-form-item__value">{props.style.justifyContent}</strong>
            <div className="sidebar-form-item__editor">
                <PicRadioGroup items={options}
                               value={props.style.justifyContent}
                               onChange={valueChanged}/>
            </div>
        </div>
    </>)
});

export default JustifyContentEditor;