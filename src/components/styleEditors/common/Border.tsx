import DocumentNode from "../../../models/DocumentStructure/documentNode";
import {CssBorder, ICssBorder} from "../../../models/htmlNativeWrappers/CssBorder";
import BorderControl from "../../ui/formControllers/borderControl";

export type BorderProps = {
    selectedNode: DocumentNode
}

export default function Border(props: BorderProps) {
    const nativeNode = props.selectedNode.nativeNode;
    const valueBorder = CssBorder.parseSidesFrom(nativeNode.style).all;

    function borderValueChanged(border: ICssBorder) {
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
