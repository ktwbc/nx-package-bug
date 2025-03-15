import Fastify from "fastify";
import { app } from "./app";

// Only enable HTTPS when the environment variable is set to true
const isLocal = process.env.APP_ENV === "local";

const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 4500;

// Configure the Fastify options with pino-pretty logger.
let fastifyOptions: { logger: boolean | object; https?: any } = {
  logger:
    process.env.APP_ENV === "local"
      ? {
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "HH:MM:ss",
              ignore: "pid,hostname",
            },
          },
        }
      : true,
};

const server = Fastify(fastifyOptions);

// Register your application as a normal plugin.
server.register(app);

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] ${isLocal ? "https" : "http"}://${host}:${port}`);
  }
});
