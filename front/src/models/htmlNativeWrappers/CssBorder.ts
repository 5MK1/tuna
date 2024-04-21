import {BorderStyle} from "./BorderStyle";
import CssColor from "./CssColor";

export type BoxBorders = {
    all: CssBorder | undefined,
    top: CssBorder | undefined,
    right: CssBorder | undefined,
    bottom: CssBorder | undefined,
    left: CssBorder | undefined,
}

export interface ICssBorder {
    color: string;
    width: string;
    style: BorderStyle | '';
}

export class CssBorder implements ICssBorder {
    color: string = '';
    width: string = '';
    style: BorderStyle | '' = '';

    constructor(width: string = '', style: BorderStyle | '' = '', color: string = '') {
        this.width = width;
        this.style = style;
        this.color = color;
    }

    equals(another: CssBorder): boolean {
        return this.color === another.color
            && this.width === another.width
            && this.style === another.style;
    }

    static parseSidesFrom(styleDeclaration: CSSStyleDeclaration): BoxBorders {
        const top = CssBorder.createSide(styleDeclaration, 'Top');
        const right = CssBorder.createSide(styleDeclaration, 'Right');
        const bottom = CssBorder.createSide(styleDeclaration, 'Bottom');
        const left = CssBorder.createSide(styleDeclaration, 'Left');
        let all = CssBorder.createSide(styleDeclaration, '');
        if (!all && top && [right, bottom, left].every(side => side && side.equals(top))) {
            all = top;
        }
        return {top, right, bottom, left, all};
    }

    static createFrom(styleDeclaration: CSSStyleDeclaration): CssBorder | undefined {
        return CssBorder.createSide(styleDeclaration, '')
    }

    private static createSide(styleDeclaration: CSSStyleDeclaration, side: BorderSide): CssBorder | undefined {
        let width: string | undefined;
        let style: BorderStyle | undefined;
        let color: CssColor | undefined;
        const sideBorderRules = new CssSideBorderRules(side);
        for (let {key, value} of CssBorder.GetBorderStyles(sideBorderRules, styleDeclaration)) {
            switch (key) {
                case BorderRuleKey.all:
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
                case BorderRuleKey.style:
                    style = value as BorderStyle;
                    break;
                case BorderRuleKey.width:
                    width = value;
                    break;
                case BorderRuleKey.color:
                    color = CssColor.parse(value);
                    break;
            }
        }
        return width === undefined || style === undefined || color === undefined
            ? undefined
            : new CssBorder(width, style, color.toString());
    }

    private static* GetBorderStyles(
        rules: CssSideBorderRules,
        styleDeclaration: CSSStyleDeclaration
    ): Generator<BorderRuleKeyValuePair> {
        const all = styleDeclaration.getPropertyValue(rules.all);
        if (all) {
            yield new BorderRuleKeyValuePair(BorderRuleKey.all, all);
        }

        const style = styleDeclaration.getPropertyValue(rules.style);
        if (style) {
            yield new BorderRuleKeyValuePair(BorderRuleKey.style, style);
        }

        const width = styleDeclaration.getPropertyValue(rules.width);
        if (width) {
            yield new BorderRuleKeyValuePair(BorderRuleKey.width, width);
        }

        const color = styleDeclaration.getPropertyValue(rules.color);
        if (color) {
            yield new BorderRuleKeyValuePair(BorderRuleKey.color, color);
        }
    }
}

type BorderSide = 'Top' | 'Right' | 'Bottom' | 'Left' | '';

enum BorderRuleKey {
    all,
    style,
    width,
    color,
}

class BorderRuleKeyValuePair {
    public readonly key: BorderRuleKey;
    public readonly value: string;

    constructor(key: BorderRuleKey, value: string) {
        this.key = key;
        this.value = value;
    }
}

class CssSideBorderRules {
    public readonly all: string;
    public readonly style: string;
    public readonly width: string;
    public readonly color: string;

    constructor(side: BorderSide) {
        const sidePrefix = side ? `-${side}` : ''
        this.all = `border${sidePrefix}`;
        this.style = `border${sidePrefix}-style`;
        this.width = `border${sidePrefix}-width`;
        this.color = `border${sidePrefix}-color`;
    }
}