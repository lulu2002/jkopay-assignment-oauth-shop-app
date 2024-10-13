class GoogleToken {

  constructor(
    readonly clientId: string,
    readonly clientSecret: string,
    readonly redirectUri: string,
  ) {
  }


  createOauthUrl(scope: string) {
    return `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${scope}&access_type=offline`;
  }

}

export default GoogleToken;