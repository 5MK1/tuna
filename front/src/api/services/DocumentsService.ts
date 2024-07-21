/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocumentDto } from '../models/DocumentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DocumentsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns DocumentDto Success
     * @throws ApiError
     */
    public getDocumentsReadAll(): CancelablePromise<Array<DocumentDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/documents/read-all',
        });
    }
}
