/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequestDto } from '../models/LoginRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns string Success
     * @throws ApiError
     */
    public postAuthLoginOrRegister(
        requestBody?: LoginRequestDto,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login-or-register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
