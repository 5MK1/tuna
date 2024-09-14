import './Board.scss'
import {observer} from "mobx-react-lite";
import toolboxContext from "../../models/ToolboxContext/toolboxContext";
import dummyBlock from "./dummyBlock";
import {TunaDocument} from "../../models/DocumentStructure/TunaDocument";
import {DocumentNodeBlockComponent} from "./DocumentNodeBlockComponent";
import StopPropagationEvent from "./StopPropagationEvent";
import {TunaDocumentNode} from "../../models/DocumentStructure/TunaDocumentNode";

export type BoardProps = {
    document: TunaDocument
};

const Board = observer((props: BoardProps) => {
    function getTargetElement(e: StopPropagationEvent): HTMLElement {
        return e.target! as HTMLElement;
    }

    function handleMouseOver(e: StopPropagationEvent) {
        if (toolboxContext.tool !== undefined) {
            getTargetElement(e).style.outline = "2px solid #4A90E2";
        }
    }

    function unselectElement(element: HTMLElement) {
        element.style.outline = 'none';
    }

    function handleMouseOut(e: StopPropagationEvent) {
        unselectElement(getTargetElement(e));
    }

    function handleClickInner(e: StopPropagationEvent) {
        e.stopPropagation();
        if (toolboxContext.tool !== undefined) {
            addNodeToDocument(dummyBlock.fromTool(toolboxContext.tool), undefined);
            toolboxContext.unsetTool();
        }
        // const target = getTargetElement(e);
        // if (toolboxContext.tool !== undefined) {
        //     const node = createDummyBlock(toolboxContext.tool!);
        //     target.appendChild(node);
        //
        //     toolboxContext.setTool(undefined);
        //     unselectElement(target);
        //
        //     const documentNode = new DocumentNode(node);
        //     documentNodesStructure
        //         .add(documentNode, target === canvas.current ? undefined : target)
        //         .select(documentNode);
        // } else {
        //     const documentNode = documentNodesStructure.tryGet(target);
        //     if (documentNode) {
        //         documentNodesStructure.select(documentNode);
        //     }
        // }
    }

    function addNodeToDocument(node: TunaDocumentNode, parentNodeId: string | undefined) {
        props.document.addNode(node, parentNodeId);
    }

    return (
        <div className="board">
            <div className="board__canvas"
                 onClick={handleClickInner}
                 onMouseOver={handleMouseOver}
                 onMouseOut={handleMouseOut}>
                {props.document.rootNodes.map(
                    node => <DocumentNodeBlockComponent node={node}
                                                        addNodeToDocument={addNodeToDocument}
                                                        key={`node_${node.id}`}/>
                )}
            </div>
        </div>
    );
});

export default Board;
