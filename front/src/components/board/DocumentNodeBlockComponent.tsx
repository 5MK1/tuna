import {observer} from "mobx-react-lite";
import {TunaDocumentNode} from "../../models/DocumentStructure/TunaDocumentNode";
import toolboxContext from "../../models/ToolboxContext/toolboxContext";
import dummyBlock from "./dummyBlock";
import StopPropagationEvent from "./StopPropagationEvent";
import {CSSProperties, useEffect, useRef} from "react";

export type DocumentNodeComponentProps = {
    addNodeToDocument: (node: TunaDocumentNode, parentId: string | undefined) => void,
    node: TunaDocumentNode
}


const DocumentNodeBlockComponent = observer(({node, addNodeToDocument}: DocumentNodeComponentProps) => {
    const div = useRef<HTMLDivElement>({} as unknown as HTMLDivElement);

    useEffect(() => {
        node.styles.extractStyleFrom(div.current);
    }, []);
    
    function handleClick(e: StopPropagationEvent) {
        e.stopPropagation();
        if (toolboxContext.tool !== undefined) {
            addNodeToDocument(dummyBlock.fromTool(toolboxContext.tool), node.id);
            toolboxContext.unsetTool();
        }
    }

    return <div onClick={handleClick} style={node.styles.getProperties()} ref={div}>
        {node.children.map(child =>
            <DocumentNodeBlockComponent node={child} addNodeToDocument={addNodeToDocument} key={`node_${node.id}`}/>)}
    </div>;
});

const DocumentNodeParagraphComponent = observer(({node, addNodeToDocument}: DocumentNodeComponentProps) => {
    function handleClick(e: StopPropagationEvent) {
        e.stopPropagation();
        if (toolboxContext.tool !== undefined) {
            addNodeToDocument(dummyBlock.fromTool(toolboxContext.tool), node.id);
            toolboxContext.unsetTool();
        }
    }

    return <p contentEditable="true" onClick={handleClick} style={node.styles.getProperties()}>click to edit text</p>
});

export {DocumentNodeBlockComponent};