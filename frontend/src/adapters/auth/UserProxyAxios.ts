import UserProxy from "@src/application/auth/UserProxy";

export default class UserProxyAxios implements UserProxy {

    oauthLogin(token: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}