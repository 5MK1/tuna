import './Board.scss'
import toolboxService, {Tool} from "../../services/toolboxService";
import nodesService from "../../services/structureService";
import DescribedNode from "../../models/DocumentStructure/describedNode";
import {RefObject, useRef} from "react";

interface InnerMouseEvent {
    target: EventTarget | null,
    stopPropagation: () => void
}

export default function Board() {
    const canvas = useRef<HTMLDivElement>(null);
    let tool: Tool | undefined;
    let fooBarIndex = 1;

    toolboxService.selectedTool$.subscribe((selectedTool) => {
        tool = selectedTool;
    });

    function getTargetElement(e: InnerMouseEvent): HTMLElement {
        return e.target! as HTMLDivElement;
    }

    function handleMouseOver(e: InnerMouseEvent) {
        if (tool === Tool.flexbox) {
            getTargetElement(e).style.outline = "2px solid #4A90E2";
        }
    }

    function unselectElement(element: HTMLElement) {
        element.style.outline = 'none';
    }

    function handleMouseOut(e: InnerMouseEvent) {
        unselectElement(getTargetElement(e));
    }

    function createDummyBlock(): HTMLElement {
        const node = document.createElement('div');
        node.style.border = '1px dotted magenta';
        node.style.padding = '3px';
        node.style.margin = '3px';
        node.innerText = `node_${fooBarIndex++}`;
        node.addEventListener('click', handleClickInner);
        return node;
    }

    function handleClickInner(e: InnerMouseEvent) {
        e.stopPropagation();
        if (tool === Tool.flexbox) {
            const node = createDummyBlock();
            const target = getTargetElement(e);
            target.appendChild(node);
            toolboxService.setTool(undefined);
            unselectElement(target);
            if (target === canvas.current!) {
                nodesService.push(new DescribedNode(node));
            }
            else {
                nodesService.appendTo(target, new DescribedNode(node))
            }
            return;
        }
    }

    return (
        <div className="board">
            <div className="board__canvas"
                 ref={canvas}
                 onClick={handleClickInner}
                 onMouseOver={handleMouseOver}
                 onMouseOut={handleMouseOut} />
        </div>
    );
}
