import GoogleToken from "../../application/auth/google-token.ts";

export class LoginPageViewModel {

  constructor(private googleToken: GoogleToken) {
  }

  googleLogin() {
    const scope = "openid profile email"; // 要请求的权限
    window.location.href = this.googleToken.createOauthUrl(scope);
  }

}