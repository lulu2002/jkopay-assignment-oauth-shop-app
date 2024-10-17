import UserController from "@src/adapters/user/user-controller";
import fastify, {FastifyInstance} from "fastify";
import OauthProxyInMemory from "@test-fixture/application/auth/oauth-proxy-in-memory";
import OauthClientConfig from "@src/application/auth/oauth-client-config";
import {OauthLoginRequest, OauthLoginResponse} from "@shared/oauth-login";
import {OauthExchangeContext} from "@src/application/auth/oauth-exchange";
import UserRepository from "@src/application/user/user-repository";
import UserRepositoryInMemory from "@test-fixture/application/application/user/user-repository-in-memory";
import fastifyJwt from "@fastify/jwt";

describe('UserController', () => {

  let app: FastifyInstance;
  let controller: UserController;
  let proxy: OauthProxyInMemory;
  let clientConfig: OauthClientConfig
  let request: OauthLoginRequest
  let userRepository: UserRepository

  beforeEach(async () => {
    app = fastify();
    app.register(fastifyJwt, {secret: "$ty{[KZTe6p5z87wN.)+IHBz4l-Tt7Je_rAzMY4=;BNL=e~{I0"});
    proxy = new OauthProxyInMemory();
    clientConfig = {
      clientId: "my_client_id",
      clientSecret: "secret"
    }
    userRepository = new UserRepositoryInMemory();
    controller = new UserController(proxy, clientConfig, userRepository);

    request = {code: "my_code_111", redirect_uri: "http://localhost/callback"}

    controller.registerRoutes(app);
    await app.ready();
  });

  afterEach(() => {
    app.close();
  });

  it('should failed if client is not exists', async () => {
    await assertOauthLogin(request, 500, {success: false, message: 'server_oauth_error'})
  });

  it('should failed if redirect uri is not valid', async () => {
    proxy.setToken(withContext(), {success: false, message: "invalid_redirect_uri"})
    await assertOauthLogin(request, 400, {success: false, message: 'invalid_redirect_uri'})
  });

  it('should failed if can not decode token info', async () => {
    proxy.setToken(withContext(), {success: true, token: "my_token"})
    await assertOauthLogin(request, 500, {success: false, message: 'server_oauth_error'})
  });

  it('should create user and sign jwt token if not exists', async () => {
    proxy.setToken(withContext(), {success: true, token: app.jwt.sign({email: "test@gmail.com"})})

    await assertSuccessLogin()
  });

  it('should login exists user', async () => {
    proxy.setToken(withContext(), {success: true, token: app.jwt.sign({email: "test@gmail.com"})})

    await userRepository.create("test@gmail.com")

    await assertSuccessLogin()
  });

  async function assertSuccessLogin() {
    const res = await withOauthLogin(request);
    const body = res.json() as OauthLoginResponse;

    if (!body.success)
      throw new Error("should success");

    expect(app.jwt.decode(body.token)).toHaveProperty('email', 'test@gmail.com');
    expect(await userRepository.findByEmail("test@gmail.com")).toBeDefined();
  }

  function withContext(): OauthExchangeContext {
    return {
      client_id: clientConfig.clientId,
      client_secret: clientConfig.clientSecret,
      code: request.code,
      redirect_uri: request.redirect_uri,
    }
  }

  async function assertOauthLogin(request: OauthLoginRequest, code: number, response: OauthLoginResponse) {
    const res = await withOauthLogin(request);
    expect(res.statusCode).toBe(code);
    expect(res.json()).toEqual(response);
  }

  async function withOauthLogin(request: OauthLoginRequest) {
    return await app.inject({
      method: 'POST',
      url: '/api/login/oauth',
      body: request
    });
  }


});