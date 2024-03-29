import {BorderStyle} from "./BorderStyle";
import CssColor from "./CssColor";

export class CssBorder {
    color: string = '';
    width: string = '';
    style: BorderStyle | '' = '';

    static createFrom(styleDeclaration: CSSStyleDeclaration): CssBorder | undefined {
        const borderRules = ['border', 'borderStyle', 'borderWidth', 'borderColor'];
        const borderStyles = Object.entries(styleDeclaration).filter(entry => borderRules.indexOf(entry[0]) !== -1);
        let width: string | undefined;
        let style: BorderStyle | undefined;
        let color: CssColor | undefined;
        for (let [rule, value] of borderStyles) {
            switch (rule) {
                case 'border':
                    const firstSpace = value.indexOf(' ');
                    if (firstSpace === -1) {
                        return undefined;
                    }
                    const secondSpace = value.indexOf(' ', firstSpace + 1);
                    if (secondSpace === -1) {
                        return undefined;
                    }
                    width = value.substring(0, firstSpace);
                    style = value.substring(firstSpace + 1, secondSpace) as BorderStyle;
                    color = CssColor.parse(value.substring(secondSpace + 1));
                    break;
                case 'borderStyle':
                    style = value as BorderStyle;
                    break;
                case 'borderWidth':
                    width = value;
                    break;
                case 'borderColor':
                    color = CssColor.parse(value);
                    break;
            }
        }
        return width === undefined || style === undefined || color === undefined
            ? undefined
            : {width, style, color: color.toString()};
    }
}
