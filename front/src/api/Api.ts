/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { AccountService } from './services/AccountService';
import { AuthService } from './services/AuthService';
import { DocumentsService } from './services/DocumentsService';
import { HealthService } from './services/HealthService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class Api {
    public readonly account: AccountService;
    public readonly auth: AuthService;
    public readonly documents: DocumentsService;
    public readonly health: HealthService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.account = new AccountService(this.request);
        this.auth = new AuthService(this.request);
        this.documents = new DocumentsService(this.request);
        this.health = new HealthService(this.request);
    }
}

