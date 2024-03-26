import {BorderStyle} from "./BorderStyle";

export class CssBorder {
    width: string;
    style: BorderStyle;
    color: string;

    private constructor(width: string, style: BorderStyle, color: string) {
        this.width = width;
        this.style = style;
        this.color = color;
    }

    static createFrom(style: CSSStyleDeclaration): CssBorder | undefined {
        const borderRules = ['border', 'borderStyle', 'borderWidth', 'borderColor'];
        const borderStyles = Object.entries(style).filter(entry => borderRules.indexOf(entry[0]) !== -1);
        let width: string | undefined;
        let borderStyle: BorderStyle | undefined;
        let color: string | undefined;
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
                    borderStyle = value.substring(firstSpace + 1, secondSpace) as BorderStyle;
                    color = value.substring(secondSpace + 1);
                    break;
                case 'borderStyle':
                    borderStyle = value as BorderStyle;
                    break;
                case 'borderWidth':
                    width = value;
                    break;
                case 'borderColor':
                    color = value;
                    break;
            }
        }
        return width === undefined || borderStyle === undefined || color === undefined
            ? undefined
            : new CssBorder(width, borderStyle, color);
    }
}
