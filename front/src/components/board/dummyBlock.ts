import {ToolboxTool} from "../../models/ToolboxContext/toolboxTool";

const dummyBlock = {
    div: (): HTMLElement => {
        const node = document.createElement('div');
        node.style.padding = '10px';
        node.style.border = '1px dotted grey';
        return node;
    },
    p: (): HTMLElement => {
        const node = document.createElement('p');
        node.innerText = 'Click to edit';
        node.style.margin = '0 0 1em';
        node.contentEditable = 'true';
        node.style.border = '1px dotted lightblue';
        return node;
    },
    fromTool: (tool: ToolboxTool): HTMLElement => {
        switch (tool) {
            case ToolboxTool.flexbox:
                return dummyBlock.div();
            case ToolboxTool.text:
                return dummyBlock.p();
            case ToolboxTool.image:
                throw new Error('Image not implemented');
        }
        throw new Error('Unsupported tool')
    }
};
export default dummyBlock;
