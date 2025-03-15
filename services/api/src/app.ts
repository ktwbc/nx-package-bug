import * as path from "path";
import { FastifyInstance } from "fastify";
import AutoLoad from "@fastify/autoload";
import fastifyCors from "@fastify/cors";

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  fastify.register(fastifyCors, {
    origin: ["https://localhost:3000"],
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: { ...opts },
  });
}
