import {FastifyInstance, FastifyReply} from "fastify";
import {OauthLoginRequest, OauthLoginResponse} from "@shared/oauth-login";
import OauthProxy from "@src/application/auth/oauth-proxy";
import OauthClientConfig from "@src/application/auth/oauth-client-config";
import UserRepository from "@src/application/user/user-repository";
import User from "@src/domain/user";

export default class UserController {

  constructor(
    private proxy: OauthProxy,
    private config: OauthClientConfig,
    private userRepository: UserRepository
  ) {
  }

  registerRoutes(app: FastifyInstance) {
    app.post<{
      Body: OauthLoginRequest
    }>('/api/login/oauth', async (request, reply) => {
      const {code, redirect_uri} = request.body;
      const {clientId, clientSecret} = this.config;

      const tokenResult = await this.proxy.exchangeToken({
        code: code,
        redirect_uri: redirect_uri,
        client_id: clientId,
        client_secret: clientSecret
      });

      if (!tokenResult.success) {
        switch (tokenResult.message) {
          case "invalid_redirect_uri":
            return this.responseOauthLogin(reply, 400, {success: false, message: 'invalid_redirect_uri'});
          default:
            return this.responseOauthLogin(reply, 500, {success: false, message: 'server_oauth_error'});
        }
      }

      const email = this.tryVerifyAndGetEmail(app, tokenResult.token);

      if (!email)
        return this.responseOauthLogin(reply, 500, {success: false, message: 'server_oauth_error'});

      const user = await this.findOrCreateUser(email) ?? null;

      if (!user)
        return this.responseOauthLogin(reply, 500, {success: false, message: 'server_oauth_error'});

      const token = app.jwt.sign({email: user.email}, {expiresIn: '1h'});
      return this.responseOauthLogin(reply, 200, {success: true, message: 'ok', token: token});
    });
  }

  private tryVerifyAndGetEmail(app: FastifyInstance, token: string): string | null {
    try {
      const payload = app.jwt.decode<JwtPayload>(token);
      return payload?.email ?? null;
    } catch (error) {
      return null;
    }
  }

  private async findOrCreateUser(email: string): Promise<User | undefined> {
    let user = await this.userRepository.findByEmail(email);

    if (user)
      return user;

    return await this.userRepository.create(email);
  }

  private responseOauthLogin(reply: FastifyReply, code: number, response: OauthLoginResponse) {
    reply.code(code).send(response);
  }

}

interface JwtPayload {
  email: string;
}
