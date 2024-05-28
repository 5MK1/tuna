import './Board.scss'
import {DocumentNode} from "../../models/DocumentStructure/documentNode";
import {useRef} from "react";
import documentNodesStructure from "../../models/DocumentStructure/documentNodesStructure";
import {ToolboxTool} from "../../models/ToolboxContext/toolboxTool";
import {observer} from "mobx-react-lite";
import toolboxContext from "../../models/ToolboxContext/toolboxContext";

interface InnerMouseEvent {
    target: EventTarget | null,
    stopPropagation: () => void
}

const Board = observer(() => {
    const canvas = useRef<HTMLDivElement>({} as unknown as HTMLDivElement);

    function getTargetElement(e: InnerMouseEvent): HTMLElement {
        return e.target! as HTMLElement;
    }

    function handleMouseOver(e: InnerMouseEvent) {
        if (toolboxContext.tool !== undefined) {
            getTargetElement(e).style.outline = "2px solid #4A90E2";
        }
    }

    function unselectElement(element: HTMLElement) {
        element.style.outline = 'none';
    }

    function handleMouseOut(e: InnerMouseEvent) {
        unselectElement(getTargetElement(e));
    }

    function createDummyBlock(tool: ToolboxTool): HTMLElement {
        let node;
        switch (tool) {
            case ToolboxTool.flexbox:
                node = document.createElement('div');
                node.style.padding = '10px';
                break;
            case ToolboxTool.text:
                node = document.createElement('p');
                node.innerText = 'Click to edit';
                node.style.margin = '0 0 1em';
                node.contentEditable = 'true';
                break;
            case ToolboxTool.image:
                throw new Error('Image not implemented');
        }
        node.style.border = '1px dotted grey';
        node.addEventListener('click', handleClickInner);
        return node;
    }

    function handleClickInner(e: InnerMouseEvent) {
        e.stopPropagation();
        if (toolboxContext.tool !== undefined) {
            const node = createDummyBlock(toolboxContext.tool!);
            const target = getTargetElement(e);
            target.appendChild(node);

            toolboxContext.setTool(undefined);

            unselectElement(target);


            const documentNode = new DocumentNode(node);
            documentNodesStructure.add(
                documentNode,
                target === canvas.current ? undefined : target
            );
            documentNodesStructure.select(documentNode);
            return;
        } else {
            const documentNode = documentNodesStructure.tryGet(getTargetElement(e));
            if (documentNode) {
                documentNodesStructure.select(documentNode);
            }
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
});

export default Board;
