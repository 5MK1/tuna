import {api} from "./ApiOrWithToken";

export class AuthService {
    auth(userName: string, password: string): Promise<string> {
        return api()
            .auth
            .postAuthLoginOrRegister({userName: userName, password: password});
    }
}

const authService = new AuthService();
export {authService};