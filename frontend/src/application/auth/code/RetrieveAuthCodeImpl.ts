import RetrieveAuthCode from "@src/application/auth/code/RetrieveAuthCode";
import OauthConfig from "@src/application/auth/OauthConfig";

export default class RetrieveAuthCodeImpl implements RetrieveAuthCode {

  constructor(private oauthConfig: OauthConfig) {
  }

  retrieve(): Promise<string> {
    return new Promise((resolve, reject) => {
      const popup = window.open(
        this.oauthConfig.createOauthUrl(),
        'Login',
        'width=500,height=600'
      );

      if (!popup) {
        reject(new Error('Pop-up was blocked.'));
        return;
      }

      const handleMessage = (event: MessageEvent) => {
        if (event.origin === this.oauthConfig.apiHost) {
          const token = event.data.token;
          popup.close();

          window.removeEventListener('message', handleMessage);
          resolve(token);
        }
      };

      window.addEventListener('message', handleMessage);

      const interval = setInterval(() => {
        if (popup.closed) {
          clearInterval(interval);
          window.removeEventListener('message', handleMessage);
          reject(new Error('User closed the pop-up window.'));
        }
      }, 500);
    });
  }

}