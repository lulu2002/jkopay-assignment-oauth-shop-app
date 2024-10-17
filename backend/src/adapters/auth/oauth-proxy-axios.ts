import {
  OauthExchangeContext,
  OauthExchangeResult,
  OauthExchangeResultMessage
} from "@src/application/auth/oauth-exchange";
import OauthProxy from "@src/application/auth/oauth-proxy";
import {AxiosInstance} from "axios";
import {
  OauthExchangeRequest,
  OauthExchangeResponse,
  OauthExchangeResponseMessage
} from "@src/adapters/auth/oauth-exchange";

export default class OauthProxyAxios implements OauthProxy {

  constructor(private axios: AxiosInstance) {
  }

  async exchangeToken(request: OauthExchangeContext): Promise<OauthExchangeResult> {
    try {
      const body: OauthExchangeRequest = {
        code: request.code,
        client_id: request.client_id,
        client_secret: request.client_secret,
        redirect_uri: request.redirect_uri
      };
      const response = await this.axios.post<OauthExchangeResponse>('/api/token', body);

      const data = response.data;

      if (data.success)
        return {success: true, token: data.token}

      return {success: false, message: this.processFailedMessage(data.message)};
    } catch (error) {
      console.error('Failed to login:', error);
      return {success: false, message: 'unknown_error'};
    }
  }

  private processFailedMessage(message: OauthExchangeResponseMessage): OauthExchangeResultMessage {
    switch (message) {
      case 'invalid_credentials':
        return 'invalid_client';
      case 'invalid_redirect_uri':
        return 'invalid_redirect_uri';
      case 'server_error':
        return 'server_error';
      default:
        return 'unknown_error';
    }
  }

}