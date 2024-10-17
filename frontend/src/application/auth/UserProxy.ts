export default interface UserProxy {
  oauthLogin(code: string, redirectUri: string): Promise<OauthLoginResult>;
}

export type OauthLoginResult =
  { success: true; token: string; }
  | { success: false; message: 'server_oauth_error' }
  | { success: false; message: 'invalid_redirect_uri' }
  | { success: false; message: 'unknown_error' }