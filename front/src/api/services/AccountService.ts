/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MyAccountInfoDto } from '../models/MyAccountInfoDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AccountService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns MyAccountInfoDto Success
     * @throws ApiError
     */
    public getAccountInfo(): CancelablePromise<MyAccountInfoDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/account/info',
        });
    }
}
