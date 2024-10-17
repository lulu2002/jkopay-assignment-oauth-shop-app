import GoogleToken from "@src/application/auth/google-token";
import OauthConfig from "@src/application/auth/oauth-config";

export class LoginPageViewModel {

  constructor(
    private googleToken: GoogleToken,
    private oauthConfig: OauthConfig
  ) {
  }

  googleOAuth() {
    const scope = "openid profile email";
    window.location.href = this.googleToken.createOauthUrl(scope);
  }

  oauthLogin() {
    const popup = window.open(
      this.oauthConfig.createOauthUrl(),
      'Login',
      'width=500,height=600'
    );

    window.addEventListener('message', (event) => {
      if (event.origin === this.oauthConfig.apiHost) {
        console.log('Authorization Code:', event.data.token);
        popup?.close();
      }
    });
  }
}