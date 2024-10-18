import AuthBehavior from "@src/application/auth/behavior/AuthBehavior";

export class LoginPageViewModel {

  constructor(
    private behaviors: Map<string, AuthBehavior>
  ) {
  }

  async onLogin(type: string): Promise<boolean> {
    const behavior = this.behaviors.get(type) ?? null;

    if (!behavior) {
      window.alert('Provider not implemented');
      return false
    }

    return await behavior.execute();
  }
}

