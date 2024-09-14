import {makeAutoObservable} from "mobx";
import {ulid} from "ulid";
import {TunaNodeStyles} from "./TunaNodeStyles";

export type TunaNodeType = 'p' | 'div';

export class TunaDocumentNode {
    private _selected: boolean;
    private _navCollapsed: boolean;
    public readonly id: string;
    public readonly tag: TunaNodeType;
    public readonly children: TunaDocumentNode[];
    public readonly styles: TunaNodeStyles;
    
    public get selected() {
        return this._selected;
    }
    
    public get navCollapsed() {
        return this._navCollapsed;
    }

    constructor(id: string, tag: TunaNodeType) {
        makeAutoObservable(this);
        this._selected = false;
        this._navCollapsed = false;
        this.id = id;
        this.tag = tag;
        this.children = [];
        this.styles = new TunaNodeStyles();
    }

    public select() {
        this._selected = true;
    }
    
    public unselect() {
        this._selected = false;
    }
    
    public toggleCollapse() {
        if (this._navCollapsed) {
            this._navCollapsed = false;
        } else {
            this.collapseDeep();
        }
    }
    
    public collapseDeep() {
        this._navCollapsed = true;
        for (let child of this.children) {
            child.collapseDeep();
        }
    }
    
    addChild(childNode: TunaDocumentNode) {
        if (this.tag === 'p') {
            throw new Error('Can not add child to Paragraph node');
        }
        this.children.push(childNode);
    }

    static paragraph(): TunaDocumentNode {
        return new TunaDocumentNode(ulid(), 'p');
    }

    static div(): TunaDocumentNode {
        return new TunaDocumentNode(ulid(), 'div');
    }
}