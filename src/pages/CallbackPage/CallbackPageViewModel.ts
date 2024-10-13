import GoogleToken from "../../application/auth/google-token.ts";

class CallbackPageViewModel {

  constructor(private googleToken: GoogleToken) {
  }

  public getCodeFromUrl() {
    const url = new URL(window.location.href);
    return url.searchParams.get("code");
  }

  public async exchangeCodeForToken(code: string) {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        code: code,
        client_id: this.googleToken.clientId,
        client_secret: this.googleToken.clientSecret,
        redirect_uri: this.googleToken.redirectUri,
        grant_type: "authorization_code"
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`Error exchanging code for token with code: ${code}`, error);
      return;
    }

    const data = await response.json();
    console.log("Access Token:", data.access_token);
    await this.getUserInfo(data.access_token);
  };

  public async getUserInfo(accessToken: string) {
    const response = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();
    console.log("User Info:", userInfo);
  };

}

export default CallbackPageViewModel;