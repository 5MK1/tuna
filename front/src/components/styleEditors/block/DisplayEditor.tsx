import {
    EditorSupportedCssDisplay,
    tryParseEditorSupportedCssDisplay
} from "../../../models/htmlNativeWrappers/EditorSupportedCssDisplay";
import {DocumentNode} from "../../../models/DocumentStructure/documentNode";
import {ChangeEvent, useEffect, useState} from "react";
import PicRadioGroup from "../../ui/formControllers/picRadioGroup";
import {StyleEditorProps} from "./StyleEditorProps";
import {observer} from "mobx-react-lite";
import {NodeStyles} from "../../../models/DocumentStructure/nodeStyles";

const displayOptions = [
    {path: 'display--block.svg', value: EditorSupportedCssDisplay.block},
    {path: 'display--inline.svg', value: EditorSupportedCssDisplay.inline},
    {path: 'display--flex.svg', value: EditorSupportedCssDisplay.flex},
    {path: 'display--grid.svg', value: EditorSupportedCssDisplay.grid}
];

const DisplayEditor = observer((props: StyleEditorProps) => {
    function valueChanged(value: string) {
        props.style.display = tryParseEditorSupportedCssDisplay(value);
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
