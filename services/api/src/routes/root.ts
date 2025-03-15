import { FastifyInstance } from "fastify";
import { subscriberDelete } from "../functions/subscriberDelete";

export default async function (fastify: FastifyInstance) {
  subscriberDelete(fastify);
}
