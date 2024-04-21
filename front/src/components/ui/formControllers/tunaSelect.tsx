import {InputHTMLAttributes, ReactNode, useState} from "react";
import {InputWrapper} from "./InputWrapper";
import TunaSelectInner from "./tunaSelectInner";

export interface TunaSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    children: ReactNode
}

export default function TunaSelect(props: TunaSelectProps
) {
    const [active, setActive] = useState<boolean>(false);

    function onFocus() {
        setActive(true);
    }

    function onBlur() {
        setActive(false);
    }

    return <InputWrapper active={active}>
        <TunaSelectInner {...props}
                         onBlur={onBlur}
                         onFocus={onFocus}>
            {props.children}
        </TunaSelectInner>
    </InputWrapper>;
}
