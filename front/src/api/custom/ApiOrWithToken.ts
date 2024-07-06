import {OpenAPIConfig} from "../core/OpenAPI";
import {FetchHttpRequest} from "../core/FetchHttpRequest";
import {Api} from "../Api";
import {BaseHttpRequest} from "../core/BaseHttpRequest";
import {userSession} from "../../models/users/userSession";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class ApiOrWithToken extends Api {
    private readonly config?: Partial<OpenAPIConfig>
    private readonly requestCtor: HttpRequestConstructor = FetchHttpRequest

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        const withBaseCfg = {...config, BASE: 'https://localhost:5050'};
        super(withBaseCfg, HttpRequest);
        this.config = withBaseCfg;
        this.requestCtor = HttpRequest;
    }

    withToken(): Api {
        return new Api({...this.config, TOKEN: userSession.authenticationInfo?.token}, this.requestCtor);
    }
}

export function api(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest):
    ApiOrWithToken { return new ApiOrWithToken(config, HttpRequest); }