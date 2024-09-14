import {ToolboxTool} from "../../models/ToolboxContext/toolboxTool";
import {TunaDocumentNode} from "../../models/DocumentStructure/TunaDocumentNode";
import {CssBorder2} from "../../models/htmlNativeWrappers/CssBorder";
import {BorderStyle} from "../../models/htmlNativeWrappers/BorderStyle";

const dummyBlock = {
    div: (): TunaDocumentNode => {
        const div = TunaDocumentNode.div();
        div.styles.setValues({
            'border':  new CssBorder2('1px', BorderStyle.solid, 'grey'),
            'padding': '10Px'
        });
        return div;
    },
    p: (): TunaDocumentNode => {
        const paragraph = TunaDocumentNode.paragraph();
        paragraph.styles.setValues({
            'border': new CssBorder2('1px', BorderStyle.dotted, 'lightblue'),
            'padding': '10Px',
            'margin': '0 0 1em'
        });
        return paragraph;
    },
    fromTool: (tool: ToolboxTool): TunaDocumentNode => {
        switch (tool) {
            case ToolboxTool.flexbox:
                return dummyBlock.div();
            case ToolboxTool.text:
                return dummyBlock.p();
            case ToolboxTool.image:
                throw new Error('Image not implemented');
            default:
                throw new Error('Unsupported tool')
        }
    }
};
export default dummyBlock;
