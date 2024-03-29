import {ChangeEvent, useEffect, useRef, useState} from "react";
import {DescribedNode} from "../../../services/describedNode";
import {CssBorder} from "../../../models/htmlNativeWrappers/CssBorder";
import {BorderStyle} from "../../../models/htmlNativeWrappers/BorderStyle";

export type BorderProps = {
    selectedNode: DescribedNode
}

type BorderState = {
    width: string,
    style: string,
    color: string
};

export default function Border(props: BorderProps) {
    const nativeNode = props.selectedNode.node;
    const [form, setForm] = useState<BorderState | undefined>(undefined);
    const colorInputRef = useRef(null);

    useEffect(() => {
        setForm(CssBorder.createFrom(nativeNode.style));
        console.log(nativeNode.style.border);
    }, [props]);

    function updateWidth(e: ChangeEvent<HTMLInputElement>) {
        const width = e.target.value;
        setForm({...form!, width});
        nativeNode.style.borderWidth = width;
    }

    function updateStyle(e: ChangeEvent<HTMLSelectElement>) {
        const style = e.target.value;
        setForm({...form!, style});
        nativeNode.style.borderStyle = style;
    }

    function updateColor(e: ChangeEvent<HTMLInputElement>) {
        const color = e.target.value;
        setForm({...form!, color});
        nativeNode.style.borderColor = color;
    }

    return form
        ? <>
            <p>Border</p>
            <label style={{display: 'block'}}>
                Width:&nbsp;<input type="text"
                                   value={form.width}
                                   onChange={updateWidth}/>
            </label>
            <label style={{display: 'block'}}>
                Style:&nbsp;<select value={form.style}
                                    onChange={updateStyle}>
                {Object.entries(BorderStyle).map(pair => <option key={pair[0]}>{pair[1]}</option>)}
            </select>
            </label>
            <label>
                Color:&nbsp;<input type="color"
                                   value={form.color}
                                   onChange={updateColor}
                                   ref={colorInputRef}/>
            </label>
        </>
        : <></>;
}