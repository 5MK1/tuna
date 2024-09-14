import TunaInput from "../../ui/formControllers/TunaInput";
import project from "../../../models/DocumentStructure/tunaProject";

export default function MarginEditor() {
    const styles = project.selectedDocument
        ?.selectedNode
        ?.styles;

    return <>
        <div>
            <label>margin</label>&nbsp;
            <TunaInput value={styles?.declaration.margin}
                       onChange={({currentTarget: {value: margin}}) => {styles?.setValues({margin})}}/>
        </div>
        <div>
            <label>padding</label>&nbsp;
            <TunaInput value={styles?.declaration.padding}
                       onChange={({currentTarget: {value: padding}}) => styles?.setValues({padding})}/>
        </div>
    </>
}
