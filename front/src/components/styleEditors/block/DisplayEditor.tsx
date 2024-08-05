import PicRadioGroup from "../../ui/formControllers/picRadioGroup";
import {StyleEditorProps} from "./StyleEditorProps";
import {observer} from "mobx-react-lite";
import {EditorSupportedCssDisplay, isAllowedCssRule} from "../../../models/htmlNativeWrappers/editorSupportedCssValues";

const displayOptions = [
    {path: '/display--block.svg', value: 'block'},
    {path: '/display--inline.svg', value: 'inline'},
    {path: '/display--flex.svg', value: 'flex'},
    {path: '/display--grid.svg', value: 'grid'}
];

const DisplayEditor = observer((props: StyleEditorProps) => {
    function valueChanged(value: string) {
        props.style.display = isAllowedCssRule<EditorSupportedCssDisplay>('display', value)
    }

    return (
        <div className="sidebar-form-item">
            <label className="sidebar-form-item__label">display:</label>
            <strong className="sidebar-form-item__value">{props.style.display}</strong>
            <div className="sidebar-item__editor">
                <PicRadioGroup items={displayOptions}
                               value={props.style.display}
                               onChange={valueChanged}/>
            </div>
        </div>
    );
});

export default DisplayEditor;
