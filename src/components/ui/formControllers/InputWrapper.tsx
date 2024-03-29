import React, {useEffect, useState} from "react";
import './tunaForms.scss';

export function InputWrapper({children, active}: { children: React.ReactNode, active: boolean }) {
    const [wrapperCssClass, setWrapperCssClass] = useState<string>('');
    useEffect(() => setWrapperCssClass(active ? ' tuna-input--active' : ''), [active]);
    return <div className={'tuna-input' + wrapperCssClass} role="textbox">
        {children}
    </div>;
}
