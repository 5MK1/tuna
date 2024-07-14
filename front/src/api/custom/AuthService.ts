import {createApi} from "./createApi";

export class AuthService {
    auth(userName: string, password: string): Promise<string> {
        return createApi()
            .auth
            .postAuthLoginOrRegister({userName: userName, password: password});
    }
}

const authService = new AuthService();
export {authService};