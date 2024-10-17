import "reflect-metadata"
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import UserController from "@src/adapters/user/user-controller";
import OauthClientConfig from "@src/application/auth/oauth-client-config";
import OauthProxyAxios from "@src/adapters/auth/oauth-proxy-axios";
import axios from "axios";
import {DataSource} from "typeorm";
import {UserEntity, UserRepositoryTypeOrm} from "@src/adapters/user/user-repository-type-orm";

async function main() {
  const fastifyInstance = fastify();
  fastifyInstance.register(fastifyCors, {origin: true});
  fastifyInstance.register(fastifyJwt, {secret: ",OFpPS'8.vN9WD9M+n(g6@a2'sS9afNJ8imkH4PU=L-G.]nh#^"});

  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [UserEntity],
    synchronize: true,
    logging: true,
  });

  await dataSource.initialize()

  const proxy = new OauthProxyAxios(axios.create({baseURL: "http://localhost:8080"}));
  const repository = new UserRepositoryTypeOrm(dataSource);
  const config: OauthClientConfig = {
    clientId: "test_client",
    clientSecret: "test_secret"
  }
  const userController = new UserController(proxy, config, repository)

  userController.registerRoutes(fastifyInstance);

  fastifyInstance.listen({port: 8081}, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

main();
