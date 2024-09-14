import BorderControl from "../../ui/formControllers/borderControl";
import project from "../../../models/DocumentStructure/tunaProject";


export default function Border() {
    const styles = project.selectedDocument
        ?.selectedNode
        ?.styles;
    
    return styles
        ? <>
            <label>Border</label>&nbsp;
            <BorderControl valueBorder={styles.declaration.border}
                           onValueBorderChanged={(border => styles?.setValues({border}))}/>
        </>
        :
        <></>;
}
