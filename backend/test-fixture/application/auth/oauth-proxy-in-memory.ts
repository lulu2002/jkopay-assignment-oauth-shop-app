import {OauthExchangeContext, OauthExchangeResult} from "@src/application/auth/oauth-exchange";
import OauthProxy from "@src/application/auth/oauth-proxy";

export default class OauthProxyInMemory implements OauthProxy {
  private tokens: Map<OauthExchangeContext, OauthExchangeResult> = new Map();

  async exchangeToken(request: OauthExchangeContext): Promise<OauthExchangeResult> {
    const result = this.tokens.entries().find(([context, _]) => this.isEqual(context, request))?.[1];

    if (!result)
      return {success: false, message: "server_error"};

    return result;
  }

  setToken(context: OauthExchangeContext, result: OauthExchangeResult) {
    this.tokens.set(context, result);
  }

  private isEqual(context: OauthExchangeContext, other: OauthExchangeContext): boolean {
    return context.client_id === other.client_id
      && context.client_secret === other.client_secret
      && context.code === other.code
      && context.redirect_uri === other.redirect_uri;
  }

}