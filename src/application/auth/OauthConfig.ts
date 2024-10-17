export default class OauthConfig {

  constructor(
    readonly apiHost: string,
    readonly apiPath: string,
    readonly clientId: string,
    readonly redirectUri: string,
  ) {
  }

  createOauthUrl() {
    return `${this.apiHost}/${this.apiPath}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}`;
  }

}