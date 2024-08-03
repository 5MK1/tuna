import {DocumentDto} from "../models/DocumentDto";
import {createApi} from "./createApi";

export class DocumentsService {
    getMyDocuments(): Promise<DocumentDto[]> {
        return createApi()
            .documents
            .getDocumentsReadAll();
    }

    getDocument(documentId: string): Promise<DocumentDto> {
        return createApi()
            .documents
            .getDocumentsRead(documentId);
    }
}

const myDocumentsService = new DocumentsService();
export default myDocumentsService;