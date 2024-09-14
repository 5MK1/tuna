import {DocumentNodeDto} from "../../api";

function collectNodesRecursively(
    nodes: DocumentNodeDto[],
    parentIdMap: Map<string, DocumentNodeDto[]>
): DocumentNodeDto[] {
    const result: DocumentNodeDto[] = [];
    (function recursiveSearch(currentNodes: DocumentNodeDto[]) {
        for (let node of currentNodes) {
            result.push(node);
            if (parentIdMap.has(node.id!)) {
                recursiveSearch(parentIdMap.get(node.id!)!);
            }
        }
    })(nodes);
    return result;
}

export function sortNodesByParentId(nodes: DocumentNodeDto[]): DocumentNodeDto[] {
    const root: DocumentNodeDto[] = [];
    const parentIdMap = new Map<string, DocumentNodeDto[]>();
    for (let node of nodes) {
        if (!node.parentNodeId) {
            root.push(node)
            continue;
        }

        if (parentIdMap.has(node.parentNodeId)) {
            parentIdMap.get(node.parentNodeId)!.push(node);
        } else {
            parentIdMap.set(node.parentNodeId, [node]);
        }
    }
    return collectNodesRecursively(root, parentIdMap);
}