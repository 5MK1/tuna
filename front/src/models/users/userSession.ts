import {autorun, makeAutoObservable, runInAction} from "mobx";
import {authService} from "../../api/custom/AuthService";
import {userAccountService} from "../../api/custom/UserAccountService";

export class UserSession {
    private _userName: string | undefined;

    get authenticated() {
        return this._userName !== undefined;
    }

    get userName(): string | undefined {
        return this._userName;
    }

    set userName(name: string | undefined) {
        this._userName = name;
    }

    constructor() {
        makeAutoObservable(this);
        this._userName = undefined;
    }

    async auth(userName: string, password: string) {
        await authService.auth(userName, password);
        runInAction(() => this._userName = userName);
    }

    async unAuth() {
        await authService.logout();
        runInAction(() => this._userName = undefined);
    }
}

const userSession = new UserSession();
autorun(async () => {
    try {
        userSession.userName = await userAccountService.getAccountInfo();
    } catch {
        userSession.userName = undefined;
    }
});
export {userSession};
