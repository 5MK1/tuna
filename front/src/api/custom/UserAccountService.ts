import {createApi} from "./createApi";

export class UserAccountService {
    async getAccountInfo(): Promise<string> {
        const dto = await createApi()
            .account
            .getAccountInfo();
        return dto?.name ?? '';
    }
}
const userAccountService = new UserAccountService();
export {userAccountService};