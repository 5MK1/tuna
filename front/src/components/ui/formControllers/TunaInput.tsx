import React, {InputHTMLAttributes, useEffect, useState} from "react";
import './tunaForms.scss';
import {InputWrapper} from "./InputWrapper";

export interface TunaInputProps extends InputHTMLAttributes<HTMLInputElement> {
    invalid?: boolean | undefined
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
        <InputWrapper active={active} invalid={props.invalid}>
            <input {...props}
                   onFocus={onFocus}
                   onBlur={onBlur}
                   className="tuna-input__input"/>
        </InputWrapper>
    )
}
