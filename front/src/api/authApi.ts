import {IAuthService, Password} from "../models/users/userSession";

class AuthApi implements IAuthService {
    auth(password: Password): Promise<string> {
        return Promise.resolve("123");
    }
}

const authApi = new AuthApi();
export default authApi;
