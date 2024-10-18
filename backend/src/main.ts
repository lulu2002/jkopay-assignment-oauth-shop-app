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
import dotenv from "dotenv";
import process from "node:process";

async function main() {
  dotenv.config({path: '../.env'});

  const fastifyInstance = fastify();
  fastifyInstance.register(fastifyCors, {origin: true});
  fastifyInstance.register(fastifyJwt, {secret: process.env.JWT_SECRET!});

  const dataSource = new DataSource({
    type: 'sqlite',
    database: '../database.sqlite',
    entities: [UserEntity],
    synchronize: true,
    logging: true,
  });

  await dataSource.initialize()

  const proxy = new OauthProxyAxios(axios.create({baseURL: process.env.OAUTH_HOST!}));
  const repository = new UserRepositoryTypeOrm(dataSource);
  const config: OauthClientConfig = {
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  }
  const userController = new UserController(proxy, config, repository)

  userController.registerRoutes(fastifyInstance);

  fastifyInstance.listen({port: Number(process.env.PORT!)}, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

main();
