import PicRadioGroup from "../../ui/formControllers/picRadioGroup";
import {observer} from "mobx-react-lite";
import {StyleEditorProps} from "./StyleEditorProps";

const displayOptions = [
    {path: '/display--block.svg', value: 'block'},
    {path: '/display--inline.svg', value: 'inline'},
    {path: '/display--flex.svg', value: 'flex'},
    {path: '/display--grid.svg', value: 'grid'}
];

const DisplayEditor = observer(({styles}: StyleEditorProps) => {
    return (
        <div className="sidebar-form-item">
            <label className="sidebar-form-item__label">display:</label>
            <strong className="sidebar-form-item__value">{styles.declaration.display}</strong>
            <div className="sidebar-item__editor">
                <PicRadioGroup items={displayOptions}
                               value={styles.declaration.display}
                               onChange={(display) => styles.setValues({display})}/>
            </div>
        </div>
    );
});

export default DisplayEditor;
