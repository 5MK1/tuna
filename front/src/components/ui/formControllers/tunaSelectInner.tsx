import {ChangeEvent, useEffect, useRef, useState} from "react";
import {TunaSelectProps} from "./tunaSelect";
import SelectButton from "../SelectButton";

export default function TunaSelectInner(props: TunaSelectProps) {
    const minWidth = 3;
    const maxWidth = 100;
    const [selectWidth, setSelectWidth] = useState<string>('');
    const selectRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        setSelectWidth(resolveSelectWidth(props.value));
    }, [props.value]);

    function resolveSelectWidth(val: any): string {
        const option = [...selectRef.current!.options].filter(option => option.value === val)[0];
        const len = (option?.text ?? val).toString().length;
        return `${len < minWidth
            ? minWidth
            : len > maxWidth
                ? maxWidth
                : len}ch`;
    }

    function onChange(e: ChangeEvent<HTMLSelectElement>) {
        setSelectWidth(resolveSelectWidth(e.currentTarget.value));
        props.onChange && props.onChange(e);
    }

    return <label style={{...props.style, display: 'inline-flex', alignItems: 'center'}}>
        <select {...props}
                style={{ width: selectWidth}}
                onChange={onChange}
                ref={selectRef}
                className="tuna-input__select">
            {props.children}
        </select>
        <span style={{marginLeft: '0.5ch', display: 'inline-flex', alignItems: 'center'}}>
            <SelectButton />
        </span>
    </label>
}