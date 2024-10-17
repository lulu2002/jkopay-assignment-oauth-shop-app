import RetrieveAuthCode from "@src/application/auth/code/RetrieveAuthCode";
import AuthBehavior from "@src/application/auth/behavior/AuthBehavior";
import UserProxy from "@src/application/auth/UserProxy";
import OauthConfig from "@src/application/auth/OauthConfig";

export default class AuthBehaviorCustom implements AuthBehavior {

  constructor(
    private retrieveAuthCode: RetrieveAuthCode,
    private config: OauthConfig,
    private proxy: UserProxy
  ) {
  }

  async execute(): Promise<void> {
    const code = await this.retrieveAuthCode.retrieve();
    const res = await this.proxy.oauthLogin(code, this.config.redirectUri);

    if (res.success)
      localStorage.setItem('jkopay-shop-token', res.token);
  }


}