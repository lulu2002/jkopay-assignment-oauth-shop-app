import {OauthExchangeContext, OauthExchangeResult} from "@src/application/auth/oauth-exchange";

export default interface OauthProxy {
  exchangeToken(request: OauthExchangeContext): Promise<OauthExchangeResult>;
}

