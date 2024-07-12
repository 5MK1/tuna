import React, {useEffect, useState} from "react";
import './tunaForms.scss';

export type InputWrapperProps = {
    children: React.ReactNode,
    active: boolean,
    invalid?: boolean | undefined,
    tid?: string | undefined
}

const blockCssClass = 'tuna-input';

export function InputWrapper({children, active, invalid, tid}: InputWrapperProps) {
    const [cssClass, setCssClass] = useState<string>(blockCssClass);

    useEffect(
        () => {
            let cssClass = blockCssClass;
            if (active) {
                cssClass += ' tuna-input--active';
            }
            if (invalid === true) {
                cssClass += ' tuna-input--invalid';
            }
            setCssClass(cssClass);
        },
        [active, invalid]
    );

    return <div className={cssClass} data-tid={tid} role="textbox">
        {children}
    </div>;
}
