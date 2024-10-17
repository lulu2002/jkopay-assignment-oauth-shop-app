import RetrieveAuthCode from "@src/application/auth/code/RetrieveAuthCode";
import AuthBehavior from "@src/application/auth/behavior/AuthBehavior";

export default class AuthBehaviorCustom implements AuthBehavior {

  constructor(
    private retrieveAuthCode: RetrieveAuthCode
  ) {
  }

  async execute(): Promise<void> {
    const code = await this.retrieveAuthCode.retrieve();
  }


}