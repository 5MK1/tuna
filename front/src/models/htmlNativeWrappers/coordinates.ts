export default class Coordinates {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static origin(): Coordinates {
        return new Coordinates(0, 0);
    }

    public static from({clientX, clientY}: {clientX: number, clientY: number}) : Coordinates {
        return new Coordinates(clientX, clientY);
    }
}
