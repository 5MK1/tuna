import React, {useState} from "react";
import {InputWrapper} from "./InputWrapper";
import TunaColorInputInner, {TunaColorInputProps} from "./TunaColorInputInner";

export function TunaColorInput(props: TunaColorInputProps) {
    const [active, setActive] = useState<boolean>(false);
    return <InputWrapper active={active}>
        <TunaColorInputInner {...props}
                             onFocus={() => setActive(true)}
                             onBlur={() => setActive(false)}/>
    </InputWrapper>
}
