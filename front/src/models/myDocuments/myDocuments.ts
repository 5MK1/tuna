import {makeAutoObservable, runInAction} from "mobx";
import {DocumentDto} from "../../api";
import myDocumentsService from "../../api/custom/MyDocumentsService";

export class MyDocuments {
    private _documents: DocumentDto[];

    public get documents(): DocumentDto[] {
        return this._documents;
    }

    constructor() {
        makeAutoObservable(this);
        this._documents = [];
    }

    async fetchDocuments() {
        const documents = await myDocumentsService.getMyDocuments();
        runInAction(() => {
            this._documents = documents;
        });
    }
}
const myDocuments = new MyDocuments();
export default myDocuments;