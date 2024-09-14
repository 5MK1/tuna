import {observer} from "mobx-react-lite";
import {StyleEditorProps} from "./StyleEditorProps";
import PicRadioGroup from "../../ui/formControllers/picRadioGroup";

const options = [
    {path: '/justify-content--flex-start.svg', value: 'flex-start'},
    {path: '/justify-content--flex-end.svg', value: 'flex-end'},
    {path: '/justify-content--center.svg', value: 'center'},
    {path: '/justify-content--space-between.svg', value: 'space-between'},
    {path: '/justify-content--space-around.svg', value: 'space-around'}
];

const JustifyContentEditor = observer(({styles}: StyleEditorProps) => {
    return (
        <div className="sidebar-form-item">
            <label className="sidebar-form-item__label">justify&nbsp;content:</label>
            <strong className="sidebar-form-item__value">{styles.declaration.justifyContent}</strong>
            <div className="sidebar-form-item__editor">
                <PicRadioGroup items={options}
                               value={styles.declaration.justifyContent}
                               onChange={(justifyContent) => styles.setValues({justifyContent})}/>
            </div>
        </div>
    )
});

export default JustifyContentEditor;