import {autorun, makeAutoObservable} from "mobx";

export interface UserToken {
    userName: string;
    token: string;
}

export interface Password {
    userName: string;
    password: string;
}

export interface IAuthService {
    auth(password: Password): Promise<string>;
}

export class UserSession {
    token: UserToken | undefined;

    constructor() {
        makeAutoObservable(this);
        this.token = undefined;
    }

    * auth(service: IAuthService, password: Password): any {
        const token = yield service.auth(password);
        this.token = {userName: password.userName, token};
    }
}

const userSession = new UserSession();
autorun(() => {
    //
});
export {userSession};
