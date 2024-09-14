import {makeAutoObservable, runInAction} from "mobx";
import documentsService from "../../api/custom/DocumentsService";
import {TunaDocument} from "./TunaDocument";

export class TunaProject {
    public documents?: TunaDocument[];
    public selectedDocument: TunaDocument | undefined;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    public async fetch(id: string) {
        const fetched = await documentsService.getDocument(id);
        runInAction(() => {
            const document = new TunaDocument(fetched.id!);
            for (let fetchedNode in fetched.nodes) {
                // TODO
            }
            this.documents = [document];
            this.selectedDocument = document;
        });
    }
}

const project = new TunaProject();
export default project;