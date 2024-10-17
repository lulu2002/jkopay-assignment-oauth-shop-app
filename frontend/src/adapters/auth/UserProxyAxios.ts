import UserProxy, {OauthLoginResult} from "@src/application/auth/UserProxy";
import {AxiosInstance} from "axios";
import {OauthLoginRequest, OauthLoginResponse} from "@shared/oauth-login";

export default class UserProxyAxios implements UserProxy {

  constructor(private axios: AxiosInstance) {
  }

  async oauthLogin(code: string, redirectUri: string): Promise<OauthLoginResult> {
    try {
      const body: OauthLoginRequest = {
        code: code,
        redirect_uri: redirectUri
      }
      const response = await this.axios.post<OauthLoginResponse>('/api/login/oauth', body);

      const data = response.data;

      if (data.success)
        return {success: true, token: data.token};

      return {success: false, message: data.message};
    } catch (error) {
      console.error('Failed to login:', error);
      return {success: false, message: 'unknown_error'};
    }
  }

  // async oauthLogin(token: string,): Promise<OauthLoginResponse> {
  //
  //     try {
  //         const response = await this.axios.get<OauthLoginResponse>('/api/login/oauth', {
  //         });
  //     } catch (error) {
  //         console.error('Failed to login:', error);
  //     }
  // }

}