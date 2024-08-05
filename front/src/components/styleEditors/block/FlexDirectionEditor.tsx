import {StyleEditorProps} from "./StyleEditorProps";
import PicRadioGroup from "../../ui/formControllers/picRadioGroup";
import {observer} from "mobx-react-lite";

const flexDirectionOptions = [
    {path: '/flex-direction--row.svg', value: 'row'},
    {path: '/flex-direction--row-reverse.svg', value: 'row-reverse'},
    {path: '/flex-direction--column.svg', value: 'column'},
    {path: '/flex-direction--column-reverse.svg', value: 'column-reverse'},
];

const FlexDirectionEditor = observer((props: StyleEditorProps) => {
    function valueChanged(value: string) {
        props.style.flexDirection = value;
    }

    return (
        <div className="sidebar-form-item">
            <label className="sidebar-form-item__label">direction:</label>
            <strong className="sidebar-form-item__value">{props.style.flexDirection}</strong>
            <div className="sidebar-form-item__editor">
                <PicRadioGroup items={flexDirectionOptions}
                               value={props.style.flexDirection}
                               onChange={valueChanged}/>
            </div>
        </div>
    );
});

export default FlexDirectionEditor;