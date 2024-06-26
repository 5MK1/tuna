import {InputWrapper} from "./InputWrapper";
import TunaColorInputInner from "./TunaColorInputInner";
import CssColor from "../../../models/htmlNativeWrappers/CssColor";
import {CssBorder, ICssBorder} from "../../../models/htmlNativeWrappers/CssBorder";
import {ChangeEvent, useEffect, useState} from "react";
import {BorderStyle} from "../../../models/htmlNativeWrappers/BorderStyle";
import TunaSelectInner from "./tunaSelectInner";

export type BorderEventHandler = (border: ICssBorder) => void;

export interface BorderControlProps {
    valueBorder?: ICssBorder | undefined,
    onValueBorderChanged?: BorderEventHandler | undefined
}

export default function BorderControl(props: BorderControlProps) {
    const [borderState, setBorderState] = useState<ICssBorder>(new CssBorder());
    const [activeState, setActiveState] = useState<boolean>(false);
    const [widthInputWidth, setWidthInputWidth] = useState<string>('3ch');

    useEffect(() => {
        setBorderState(props.valueBorder ?? new CssBorder());
    }, [props.valueBorder]);

    function handleWidthChanged(e: ChangeEvent<HTMLInputElement>) {
        const width = e.currentTarget.value;
        const textLength = width.length;
        const inputWidth = textLength < 3
            ? 3
            : textLength > 5
                ? 5
                : textLength;
        setWidthInputWidth(`${inputWidth}ch`);
        const newState = {...borderState, width};
        setBorderState(newState);
        props.onValueBorderChanged && props.onValueBorderChanged(newState);
    }

    function handleStyleChanged(e: ChangeEvent<HTMLSelectElement>) {
        const style = e.currentTarget.value as BorderStyle;
        const newState = {...borderState, style};
        setBorderState(newState);
        props.onValueBorderChanged && props.onValueBorderChanged(newState);
    }

    function handleColorChanged(cssColor: CssColor) {
        const color = cssColor.toString();
        const newState = {...borderState, color};
        setBorderState(newState);
        props.onValueBorderChanged && props.onValueBorderChanged(newState);
    }

    function handleOnFocus() {
        setActiveState(true);
    }

    function handleOnBlur() {
        setActiveState(false);
    }

    return <InputWrapper active={activeState}>
        <input value={borderState.width}
               onFocus={handleOnFocus}
               onBlur={handleOnBlur}
               onChange={handleWidthChanged}
               type="text"
               className="tuna-input__input"
               style={{width: widthInputWidth}}/>
        <TunaSelectInner value={borderState.style}
                         onFocus={handleOnFocus}
                         onBlur={handleOnBlur}
                         onChange={handleStyleChanged}
                         className="tuna-input__select"
                         style={{margin: '0 2ch'}}>
            {Object.entries(BorderStyle).map(pair => <option key={pair[0]}>{pair[1]}</option>)}
        </TunaSelectInner>
        <TunaColorInputInner value={borderState.color}
                             onBlur={handleOnBlur}
                             onFocus={handleOnFocus}
                             colorChanged={handleColorChanged}/>
    </InputWrapper>
}