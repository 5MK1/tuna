import {DocumentDto} from "../models/DocumentDto";
import {createApi} from "./createApi";

export class MyDocumentsService {
    getMyDocuments(): Promise<DocumentDto[]> {
        return createApi()
            .documents
            .getDocumentsReadAll();
    }
}

const myDocumentsService = new MyDocumentsService();
export default myDocumentsService;