export interface OauthExchangeContext {
  code: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

export type OauthExchangeResult =
  { success: true; token: string; } |
  { success: false; message: 'invalid_code' | 'invalid_client' | 'invalid_redirect_uri' | 'server_error' };