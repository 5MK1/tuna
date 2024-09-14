import {observer} from "mobx-react-lite";
import PicRadioGroup from "../../ui/formControllers/picRadioGroup";
import {StyleEditorProps} from "./StyleEditorProps";

const options = [
    {path: '/align-items--stretch.svg', value: 'stretch'},
    {path: '/align-items--flex-start.svg', value: 'flex-start'},
    {path: '/align-items--flex-end.svg', value: 'flex-end'},
    {path: '/align-items--center.svg', value: 'center'},
];

const AlignItemsEditor = observer(({styles}: StyleEditorProps) => {
    return (
        <div className="sidebar-form-item">
            <label className="sidebar-form-item__label">align&nbsp;items:</label>
            <strong className="sidebar-form-item__value">{styles.declaration.alignItems}</strong>
            <div className="sidebar-item__editor">
                <PicRadioGroup items={options}
                               value={styles.declaration.alignItems}
                               onChange={(alignItems) => styles.setValues({alignItems})}/>
            </div>
        </div>
    )
});

export default AlignItemsEditor;