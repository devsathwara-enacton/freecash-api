import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  FastifyTypeProviderDefault,
} from "fastify";
import fastifyPassport from "@fastify/passport";
import * as authController from "./auth.controller";
import z from "zod";
import { isAuthenticated } from "../../middleware/authMiddleware";
import {
  emailSchema,
  loginSchema,
  passwordSchema,
  registerUserSchema,
} from "./auth.schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export default async function (app: FastifyInstance) {
  app.get("/example", (req: FastifyRequest, res: FastifyReply) => {
    app.redis.get("settings", (err, val) => {
      if (val) {
        return res.send({ settings: JSON.parse(val) });
      }
    });
  });

  app.withTypeProvider<FastifyTypeProviderDefault>().route({
    method: "GET",
    url: "/google",
    preValidation: fastifyPassport.authenticate("google", {
      scope: ["profile", "email"],
    }),
    schema: { tags: ["Authentication"] },
    handler: async () => {
      console.log("GOOGLE API forward");
    },
  });

  app.get(
    "/facebook",
    {
      preValidation: fastifyPassport.authenticate("facebook", {
        scope: ["profile", "email"],
      }),
      schema: { tags: ["Authentication"] },
    },
    async () => {
      console.log("facebook API forward");
    }
  );

  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/register",
    schema: {
      body: registerUserSchema,
      tags: ["Authentication"],
    },
    handler: authController.register,
  });
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/login",
    schema: {
      body: loginSchema,
      tags: ["Authentication"],
    },
    handler: authController.login,
  });
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/logout",
    preValidation: isAuthenticated,
    schema: { tags: ["Authentication"] },
    handler: (req: FastifyRequest, reply: FastifyReply) => {
      reply.clearCookie("accessToken");
      req.session.delete();
      req.logout();
      return reply.send({
        message: "Logout Successful",
      });
    },
  });
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/verify-email/",
    schema: {
      querystring: z.object({
        token: z.string(),
      }),
      tags: ["Authentication"],
    },
    handler: authController.verifyEmail,
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/forgot-password",
    schema: {
      body: emailSchema,
      tags: ["Authentication"],
    },
    handler: authController.forgotPassword,
  });
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/reset-password/",
    schema: {
      body: passwordSchema,
      tags: ["Authentication"],
    },
    handler: authController.resetPassword,
  });
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/change-password",
    preHandler: isAuthenticated,
    schema: {
      body: passwordSchema,
      tags: ["Authentication"],
    },
    handler: authController.changePassword,
  });
}
