import AuthBehavior from "@src/application/auth/behavior/AuthBehavior";
import GoogleToken from "@src/application/auth/GoogleToken";

export class LoginPageViewModel {

  constructor(
    private googleToken: GoogleToken,
    private behaviors: Map<string, AuthBehavior>
  ) {
  }

  googleOAuth() {
    const scope = "openid profile email";
    window.location.href = this.googleToken.createOauthUrl(scope);
  }

  async onLogin(type: string): Promise<void> {
    const behavior = this.behaviors.get(type) ?? null;

    if (!behavior) {
      window.alert('Provider not implemented');
      return;
    }

    await behavior.execute()
  }
}

