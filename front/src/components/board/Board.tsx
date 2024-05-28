import './Board.scss'
import {DocumentNode} from "../../models/DocumentStructure/documentNode";
import {useRef} from "react";
import documentNodesStructure from "../../models/DocumentStructure/documentNodesStructure";
import {ToolboxTool} from "../../models/ToolboxContext/toolboxTool";
import {observer} from "mobx-react-lite";
import toolboxContext from "../../models/ToolboxContext/toolboxContext";
import dummyBlock from "./dummyBlock";

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
        const node = dummyBlock.fromTool(tool);
        node.addEventListener('click', handleClickInner);
        return node;
    }

    function handleClickInner(e: InnerMouseEvent) {
        e.stopPropagation();
        const target = getTargetElement(e);
        if (toolboxContext.tool !== undefined) {
            const node = createDummyBlock(toolboxContext.tool!);
            target.appendChild(node);

            toolboxContext.setTool(undefined);
            unselectElement(target);

            const documentNode = new DocumentNode(node);
            documentNodesStructure
                .add(documentNode, target === canvas.current ? undefined : target)
                .select(documentNode);
        } else {
            const documentNode = documentNodesStructure.tryGet(target);
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
                 onMouseOut={handleMouseOut} />
        </div>
    );
});

export default Board;
