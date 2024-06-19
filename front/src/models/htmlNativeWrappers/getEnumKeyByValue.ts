export function getEnumKeyByValue<T extends { [index: string]: string }>(map: T, val: string): keyof T | undefined {
    return Object.keys(map).filter(x => map[x] == val)[0];
}
