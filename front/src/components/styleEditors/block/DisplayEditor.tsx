import {
    EditorSupportedCssDisplay,
    tryParseEditorSupportedCssDisplay
} from "../../../models/htmlNativeWrappers/EditorSupportedCssDisplay";
import {DocumentNode} from "../../../models/DocumentStructure/documentNode";
import {ChangeEvent, useEffect, useState} from "react";
import PicRadioGroup from "../../ui/formControllers/picRadioGroup";

export type DisplayEditorProps = {
    node: DocumentNode
}



const displayOptions = [
    {path: 'display--block.svg', value: EditorSupportedCssDisplay.block},
    {path: 'display--inline.svg', value: EditorSupportedCssDisplay.inline},
    {path: 'display--flex.svg', value: EditorSupportedCssDisplay.flex},
    {path: 'display--grid.svg', value: EditorSupportedCssDisplay.grid}
];

export default function DisplayEditor(props: DisplayEditorProps) {
    const [display, setDisplay] = useState<EditorSupportedCssDisplay | ''>('');

    useEffect(() => {
        setDisplay(props.node.style.display ?? '');
    }, [props.node.style.display]);

    function valueChanged(value: string) {
        const convertedValue = tryParseEditorSupportedCssDisplay(value);
        setDisplay(convertedValue ?? '');
        props.node.style.display = convertedValue;
    }

    return (<>
        <PicRadioGroup items={displayOptions}
                       value={display}
                       onChange={valueChanged}/>
    </>);
}
