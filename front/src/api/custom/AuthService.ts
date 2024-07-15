import {createApi} from "./createApi";

export class AuthService {
    auth(userName: string, password: string): Promise<string> {
        return createApi()
            .auth
            .postAuthLoginOrRegister({userName: userName, password: password});
    }

    logout(): Promise<void> {
        return createApi().auth.postAuthLogout();
    }
}

const authService = new AuthService();
export {authService};