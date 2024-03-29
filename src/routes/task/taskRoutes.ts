import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as taskController from "./task.controller";
import { isAuthenticated } from "../../middleware/authMiddleware";
import { fetchTaskResponseSchema } from "./task.schemas";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/",
    schema: { response: { 200: fetchTaskResponseSchema }, tags: ["Tasks"] },
    preHandler: isAuthenticated,
    handler: taskController.fetch,
  });
}
