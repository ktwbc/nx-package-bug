import "reflect-metadata";
import "source-map-support/register";
import { writeAudit, AuditTrailEvent } from "@ktwbc/lib";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RouteHandlerMethod } from "fastify/types/route";

/**
 * subscriberDelete
 */
export const main: RouteHandlerMethod = async (
  _req: FastifyRequest,
  reply: FastifyReply,
) => {
  await writeAudit(undefined, "123", AuditTrailEvent.Test);

  return reply.code(200).send("Deleted");
};

export const subscriberDelete = (fastify: FastifyInstance) => {
  fastify.delete("/subscriber/{subscriberId}", main);
};
