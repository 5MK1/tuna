import TunaSelect from "../../ui/formControllers/tunaSelect";
import {CssDisplay} from "../../../models/htmlNativeWrappers/CssDisplay";
import DocumentNode from "../../../models/DocumentStructure/documentNode";
import {ChangeEvent, useEffect, useState} from "react";

export type DisplayEditorProps = {
    node: DocumentNode
}

export default function DisplayEditor(props: DisplayEditorProps) {
    const [display, setDisplay] = useState<CssDisplay>(getDisplay());

    function getDisplay(): CssDisplay {
        return props.node.nativeNode.style.display as CssDisplay
    }

    useEffect(() => {
        setDisplay(getDisplay());
    }, [props.node.nativeNode.style.display])

    function valueChanged(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.currentTarget.value as CssDisplay
        setDisplay(value);
        props.node.nativeNode.style.display = value;
    }

    return <>
        <label>display</label>&nbsp;
        <TunaSelect {...props} value={display} onChange={valueChanged}>
            <option value="">unset</option>
            {Object.entries(CssDisplay).map(pair => <option key={pair[0]}>{pair[1]}</option>)}
        </TunaSelect>
    </>;
}