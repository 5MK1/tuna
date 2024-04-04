import DocumentNode from "../../../models/DocumentStructure/documentNode";
import TunaInput from "../../ui/formControllers/TunaInput";
import {ChangeEvent, useEffect, useState} from "react";

export type MarginEditorProps = {
    node: DocumentNode
}

class GapState {
    margin: string = '';
    padding: string = ''
};

export default function MarginEditor(props: MarginEditorProps) {
    const nativeNode = props.node.nativeNode;
    const [state, setState] = useState<GapState>({
        margin: nativeNode.style.margin,
        padding: nativeNode.style.padding
    });

    useEffect(() => {
        setState({
            margin: nativeNode.style.margin,
            padding: nativeNode.style.padding
        })
    }, [nativeNode.style.margin, nativeNode.style.padding]);

    function onMarginChange(e: ChangeEvent<HTMLInputElement>) {
        const margin = e.currentTarget.value;
        setState({...state, margin});
        nativeNode.style.margin = margin;
    }

    function onPaddingChange(e: ChangeEvent<HTMLInputElement>) {
        const padding = e.currentTarget.value;
        setState({...state, padding });
        nativeNode.style.padding = padding;
    }

    return <>
        <div style={{marginBottom: '1em'}}>
            <label>margin</label>&nbsp;
            <TunaInput value={state.margin} onChange={onMarginChange}/>
        </div>
        <div>
            <label>padding</label>&nbsp;
            <TunaInput value={state.padding} onChange={onPaddingChange}/>
        </div>
    </>
}