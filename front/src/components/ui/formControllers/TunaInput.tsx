import React, {HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode, Ref, useEffect, useRef, useState} from "react";
import './tunaForms.scss';
import {InputWrapper} from "./InputWrapper";

type TunaInputProps = Pick<InputHTMLAttributes<HTMLInputElement>,
    'value' |
    'children' |
    'type' |
    'id' |
    'max' |
    'maxLength' |
    'min' |
    'minLength' |
    'multiple' |
    'name' |
    'onChange' |
    'onKeyDown'> & {
    invalid?: boolean | undefined,
    inputFocused?: boolean | undefined,
};

export default function TunaInput(props: TunaInputProps) {
    const [active, setActive] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>({} as unknown as HTMLInputElement);

    useEffect(
        () => {
            if (props.inputFocused) {
                inputRef.current.focus();
            }
        },
        [props.inputFocused]
    );

    function onFocus() {
        setActive(true);
    }

    function onBlur() {
        setActive(false);
    }

    return (
        <InputWrapper active={active} invalid={props.invalid}>
            <input onFocus={onFocus}
                   onBlur={onBlur}
                   className="tuna-input__input"
                   ref={inputRef}
                   value={props.value}
                   children={props.children}
                   type={props.type}
                   id={props.id}
                   max={props.max}
                   maxLength={props.maxLength}
                   min={props.min}
                   minLength={props.minLength}
                   multiple={props.multiple}
                   name={props.name}
                   onChange={props.onChange}
                   onKeyDown={props.onKeyDown} />
        </InputWrapper>
    )
}
