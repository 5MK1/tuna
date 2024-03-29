import {ChangeEvent, useEffect, useRef, useState} from "react";
import DocumentNode from "../../../models/DocumentStructure/documentNode";
import {CssBorder} from "../../../models/htmlNativeWrappers/CssBorder";
import {BorderStyle} from "../../../models/htmlNativeWrappers/BorderStyle";
import TunaInput from "../../ui/formControllers/TunaInput";
import TunaColorInputInner from "../../ui/formControllers/TunaColorInputInner";
import TunaSelect from "../../ui/formControllers/tunaSelect";
import BorderControl from "../../ui/formControllers/borderControl";
import {TunaColorInput} from "../../ui/formControllers/TunaColorInput";

export type BorderProps = {
    selectedNode: DocumentNode
}

export default function Border(props: BorderProps) {
    const nativeNode = props.selectedNode.nativeNode;
    const valueBorder = CssBorder.createFrom(nativeNode.style);

    function borderValueChanged(border: CssBorder) {
        console.log(border);
        if (border.width) {
            nativeNode.style.borderWidth = border.width;
        }
        if (border.style) {
            nativeNode.style.borderStyle = border.style;
        }
        if (border.color) {
            nativeNode.style.borderColor = border.color;
        }
    }

    return valueBorder
        ? <>
            <label>Border</label>&nbsp;
            <BorderControl valueBorder={valueBorder}
                           onValueBorderChanged={borderValueChanged}/>
        </>
        :
        <></>;
}
