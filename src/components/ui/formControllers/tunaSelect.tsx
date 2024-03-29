import {ChangeEvent, InputHTMLAttributes, ReactNode, useState} from "react";
import {InputWrapper} from "./InputWrapper";

export interface TunaSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    children: ReactNode
}

export default function TunaSelect(props: TunaSelectProps) {
    const [active, setActive] = useState<boolean>(false);

    function onFocus() {
        setActive(true);
    }

    function onBlur() {
        setActive(false);
    }

    return <InputWrapper active={active}>
        <select {...props}
                onFocus={onFocus}
                onBlur={onBlur}
                className="tuna-input__select">
            {props.children}
        </select>
    </InputWrapper>;
}
