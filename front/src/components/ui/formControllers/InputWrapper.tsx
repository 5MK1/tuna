import React, {useEffect, useState} from "react";
import './tunaForms.scss';

export type InputWrapperProps = {
    children: React.ReactNode,
    active: boolean,
    invalid?: boolean | undefined
}

const blockCssClass = 'tuna-input';

export function InputWrapper({children, active, invalid}: InputWrapperProps) {
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

    return <div className={cssClass} role="textbox">
        {children}
    </div>;
}
