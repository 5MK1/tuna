import {makeAutoObservable, runInAction} from "mobx";
import {authService} from "../../api/custom/AuthService";

export class UserSession {
    authenticationInfo: { userName: string, token: string } | undefined;

    get authenticated() {
        return this.authenticationInfo !== undefined;
    }

    constructor() {
        makeAutoObservable(this);
        this.authenticationInfo = undefined;
    }

    async auth(userName: string, password: string) {
        const token = await authService.auth(userName, password);
        runInAction(() => this.authenticationInfo = {userName, token});
    }
}

const userSession = new UserSession();
export {userSession};
