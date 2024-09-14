import {DocumentNodeDto} from "../../api";
import {sortNodesByParentId} from "./sortNodesByParentId";

test(
    'sortNodesByParentId should return correct result on single level source',
    () => {
        const source: DocumentNodeDto[] = [
            {id: '1', parentNodeId: null},
            {id: '2', parentNodeId: null},
            {id: '3', parentNodeId: null},
            {id: '4', parentNodeId: null},
        ];

        const result = sortNodesByParentId(source);

        expect(result).toStrictEqual([
            {id: '1', parentNodeId: null},
            {id: '2', parentNodeId: null},
            {id: '3', parentNodeId: null},
            {id: '4', parentNodeId: null},
        ]);
    }
);

test(
    'sortNodesByParentId should return correct result on multi level source',
    () => {
        const source: DocumentNodeDto[] = [
            {id: '4', parentNodeId: '1'},
            {id: '5', parentNodeId: '4'},
            {id: '1', parentNodeId: null},
            {id: '3', parentNodeId: '1'},
            {id: '2', parentNodeId: null},
            {id: '6', parentNodeId: '4'},
        ];

        const result = sortNodesByParentId(source);

        expect(result).toStrictEqual([
            {id: '1', parentNodeId: null},
            {id: '4', parentNodeId: '1'},
            {id: '5', parentNodeId: '4'},
            {id: '6', parentNodeId: '4'},
            {id: '3', parentNodeId: '1'},
            {id: '2', parentNodeId: null},
        ]);
    }
);