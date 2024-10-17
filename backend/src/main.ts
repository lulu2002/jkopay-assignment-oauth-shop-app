import process from "node:process";
import fastify from "fastify";
import fastifyFormbody from "@fastify/formbody";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";

const fastifyInstance = fastify();
fastifyInstance.register(fastifyFormbody);
fastifyInstance.register(fastifyCookie);
fastifyInstance.register(fastifyCors, {origin: true});
fastifyInstance.register(fastifyJwt, {secret: ",OFpPS'8.vN9WD9M+n(g6@a2'sS9afNJ8imkH4PU=L-G.]nh#^"});

fastifyInstance.listen({port: 8081}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})