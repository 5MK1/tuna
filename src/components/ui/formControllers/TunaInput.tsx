import React, {InputHTMLAttributes, useState} from "react";
import './tunaForms.scss';
import {InputWrapper} from "./InputWrapper";

export interface TunaInputProps extends InputHTMLAttributes<HTMLInputElement> {
    foo?: string
}

export default function TunaInput(props: TunaInputProps) {
    const [active, setActive] = useState<boolean>(false);

    function onFocus() {
        setActive(true);
    }

    function onBlur() {
        setActive(false);
    }

    return (
        <InputWrapper active={active}>
            <input {...props}
                   onFocus={onFocus}
                   onBlur={onBlur}
                   className="tuna-input__input"/>
        </InputWrapper>
    )
}