export default interface UserProxy {
  oauthLogin(token: string, redirectUri: string): Promise<void>;
}