import React, {ChangeEvent, InputHTMLAttributes, useEffect, useState} from "react";
import CssColor from "../../../models/htmlNativeWrappers/CssColor";

export type ColorChanged = (color: CssColor) => void;

export interface TunaColorInputProps extends InputHTMLAttributes<HTMLInputElement> {
    colorChanged?: ColorChanged | undefined
}

class TunaColorState {
    hexValue: string = '';
    colorValue: string = '';

    static parse(color: string): TunaColorState {
        const parsed = CssColor.parse(color);
        if (!parsed) {
            return new TunaColorState();
        }
        const strColor = parsed.toString();
        return {hexValue: strColor, colorValue: strColor};
    }
}

export default function TunaColorInputInner(props: TunaColorInputProps) {
    const { colorChanged, ...restProps } = props;
    const [color, setColor] = useState<TunaColorState>(TunaColorState.parse(`${props.value}`));

    function handleColorInputChange(e: ChangeEvent<HTMLInputElement>) {
        const colorValue = e.currentTarget.value;
        setColor({hexValue: colorValue, colorValue});

        if (props.onChange) {
            props.onChange(e);
        }

        if (colorChanged) {
            const parsed = CssColor.parse(colorValue);
            if (parsed) {
                colorChanged(parsed);
            }
        }
    }

    function handleHexInputChange(e: ChangeEvent<HTMLInputElement>) {
        const hexValue = e.currentTarget.value;
        setColor({...color, hexValue});

        if (props.onChange) {
            props.onChange(e);
        }

        if (!props.colorChanged) {
            return;
        }

        const parsedLiteral = CssColor.parse(hexValue, 'literal');
        if (parsedLiteral) {
            props.colorChanged(parsedLiteral);
            return;
        }

        const parsed = CssColor.parse(hexValue, 'hex6');
        if (parsed) {
            props.colorChanged(parsed);
        }
    }

    useEffect(() => {
        setColor(TunaColorState.parse(`${props.value}`));
    }, [props.value]);

    return <>
        <div className="tuna-input__color-input-wrapper" style={{background: color.colorValue}}>
            <input {...restProps}
                   type="color"
                   value={color.colorValue}
                   onChange={handleColorInputChange}/>
        </div>
        <input {...restProps}
               type="text"
               value={color.hexValue}
               onChange={handleHexInputChange}
               className="tuna-input__input tuna-input__input--hex"/>
    </>;
}