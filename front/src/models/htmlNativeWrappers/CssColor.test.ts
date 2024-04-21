import CssColor from "./CssColor";

test(
    'CssColor.from should parsed correctly from short HEX string',
    () => {
        const color = `${CssColor.parse('#BAD')}`;
        expect(color).toBe('#BBAADD');
    }
);

test(
    'CssColor.from should failed from invalid short HEX string',
    () => {
        const color = CssColor.parse('#XXX');
        expect(color).toBeUndefined();
    }
);

test(
    'CssColor.from should parsed correctly from full HEX string',
    () => {
        const color = `${CssColor.parse('#BADA55')}`;
        expect(color).toBe('#BADA55');
    }
);

test(
    'CssColor.from failed from invalid HEX string',
    () => {
        const color = CssColor.parse('#BADA5');
        expect(color).toBeUndefined();
    }
);

test(
    'CssColor.from should parsed correctly from rgb string',
    () => {
        const color = `${CssColor.parse('rgb(192, 255, 51)')}`;
        expect(color).toBe('#C0FF33');
    }
);

test(
    'CssColor.from should parsed correctly from rgb string with zeros',
    () => {
        const color = `${CssColor.parse('rgb(0, 0, 0)')}`;
        expect(color).toBe('#000000');
    }
);

test(
    'CssColor.from should failed from invalid rgb string',
    () => {
        const color = CssColor.parse('rgb(192, 256, 51)');
        expect(color).toBeUndefined();
    }
);

test(
    'CssColor.from should parsed correctly from string literal',
    () => {
        const color = `${CssColor.parse('dimgray')}`;
        expect(color).toBe('#696969');
    }
);

test(
    'CssColor.from should failed from undefined string literal',
    () => {
        const color = CssColor.parse('extradark');
        expect(color).toBeUndefined();
    }
);