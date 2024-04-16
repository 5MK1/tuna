import './Board.scss'
import toolboxService, {Tool} from "../../services/toolboxService";
import nodesService from "../../services/structureService";
import DocumentNode from "../../models/DocumentStructure/documentNode";
import {useRef} from "react";
import selectedNodeService from "../../services/selectedNodeService";

interface InnerMouseEvent {
    target: EventTarget | null,
    stopPropagation: () => void
}

export default function Board() {
    const canvas = useRef<HTMLDivElement>(null);
    let tool: Tool | undefined;

    toolboxService.selectedTool$.subscribe((selectedTool) => {
        tool = selectedTool;
    });

    function getTargetElement(e: InnerMouseEvent): HTMLElement {
        return e.target! as HTMLDivElement;
    }

    function handleMouseOver(e: InnerMouseEvent) {
        if (tool !== undefined) {
            getTargetElement(e).style.outline = "2px solid #4A90E2";
        }
    }

    function unselectElement(element: HTMLElement) {
        element.style.outline = 'none';
    }

    function handleMouseOut(e: InnerMouseEvent) {
        unselectElement(getTargetElement(e));
    }

    function createDummyBlock(tool: Tool): HTMLElement {
        let node;
        switch (tool) {
            case Tool.flexbox:
                node = document.createElement('div');
                node.style.padding = '10px';
                break;
            case Tool.text:
                node = document.createElement('p');
                node.innerText = 'Click to edit';
                node.style.margin = '0 0 1em';
                node.contentEditable = 'true';
                break;
            case Tool.image:
                throw new Error('Image not implemented');
        }
        node.style.border = '1px dotted grey';
        node.addEventListener('click', handleClickInner);
        return node;
    }

    function handleClickInner(e: InnerMouseEvent) {
        e.stopPropagation();
        if (tool !== undefined) {
            const node = createDummyBlock(tool);
            const target = getTargetElement(e);
            target.appendChild(node);
            toolboxService.setTool(undefined);
            unselectElement(target);
            const documentNode = new DocumentNode(node);
            nodesService.add(
                documentNode,
                target === canvas.current ? undefined : target
            );
            selectedNodeService.select(documentNode);
            return;
        }
    }

    return (
        <div className="board">
            <div className="board__canvas"
                 ref={canvas}
                 onClick={handleClickInner}
                 onMouseOver={handleMouseOver}
                 onMouseOut={handleMouseOut}/>
        </div>
    );
}
