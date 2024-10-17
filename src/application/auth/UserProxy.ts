interface UserProxy {
  oauthLogin(token: string): Promise<void>;
}