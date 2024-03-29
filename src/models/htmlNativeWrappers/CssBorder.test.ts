import {CssBorder} from "./CssBorder";

test(
    'CssBorder.createFrom should parsed correctly when only `border` rule defined',
    () => {
        const styles = {
            border: '1px solid red'
        } as CSSStyleDeclaration;

        const cssBorder = CssBorder.createFrom(styles);

        expect(cssBorder).not.toBeUndefined();
        expect(cssBorder!.style).toBe('solid');
        expect(cssBorder!.width).toBe('1px');
        expect(cssBorder!.color).toBe('#FF0000');
    }
);

test(
    'CssBorder.createFrom should parsed correctly when `border-width`, `border-style`' +
    ' and `border-color` rules defined',
    () => {
        const styles = {
            borderWidth: '69px',
            borderStyle: 'solid',
            borderColor: 'red'
        } as CSSStyleDeclaration;

        const cssBorder = CssBorder.createFrom(styles);

        expect(cssBorder).not.toBeUndefined();
        expect(cssBorder!.width).toBe('69px');
        expect(cssBorder!.style).toBe('solid');
        expect(cssBorder!.color).toBe('#FF0000');
    }
);

test(
    'CssBorder.createFrom should parsed correctly when `border` then `border-width` rules defined',
    () => {
        const styles = {
            border: '1px solid red',
            borderWidth: '69px',
        } as CSSStyleDeclaration;

        const cssBorder = CssBorder.createFrom(styles);

        expect(cssBorder).not.toBeUndefined();
        expect(cssBorder!.width).toBe('69px');
        expect(cssBorder!.style).toBe('solid');
        expect(cssBorder!.color).toBe('#FF0000');
    }
);

test(
    'CssBorder.createFrom should parsed correctly when `border-width` then `border` rules defined',
    () => {
        const styles = {
            borderWidth: '69px',
            border: '1px solid red',
        } as CSSStyleDeclaration;

        const cssBorder = CssBorder.createFrom(styles);

        expect(cssBorder).not.toBeUndefined();
        expect(cssBorder!.width).toBe('1px');
        expect(cssBorder!.style).toBe('solid');
        expect(cssBorder!.color).toBe('#FF0000');
    }
);

test(
    'CssBorder.createFrom should parsed correctly when border color present in rgb form',
    () => {
        const styles = {
            border: '1px solid rgb(255, 0, 0)',
        } as CSSStyleDeclaration;

        const cssBorder = CssBorder.createFrom(styles);

        expect(cssBorder).not.toBeUndefined();
        expect(cssBorder!.width).toBe('1px');
        expect(cssBorder!.style).toBe('solid');
        expect(cssBorder!.color).toBe('#FF0000');
    }
);

test(
    'CssBorder.createFrom should failed to parse when no border rules defined',
    () => {
        const styles = {
            color: 'red'
        } as CSSStyleDeclaration;

        const cssBorder = CssBorder.createFrom(styles);

        expect(cssBorder).toBeUndefined();
    }
);

test(
    'CssBorder.createFrom should failed to parse when incorrect `border` rule defined',
    () => {
        const styles = {
            border: '1px solid'
        } as CSSStyleDeclaration;

        const cssBorder = CssBorder.createFrom(styles);

        expect(cssBorder).toBeUndefined();
    }
);