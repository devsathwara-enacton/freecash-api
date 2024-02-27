import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { join } from "path";
import autoload from "@fastify/autoload";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifyCookie from "@fastify/cookie";
import fastifySecureSession from "@fastify/secure-session";
import fastifyPassport from "@fastify/passport";
import "./routes/auth/passport";
import cors from "@fastify/cors";
import { config } from "./config/config";
import { createJWTToken } from "./routes/auth/jwt";
import redisPlugin from "./service/redis";
import { swaggerOptions, swaggerUiOptions } from "./utils/swagger";
import { db } from "./database/database";

const createApp = (): FastifyInstance => {
  const app = fastify({ logger: true }) as FastifyInstance;
  const sessionSecret = config.env.app.sessionSecret?.toString();
  if (!sessionSecret) {
    throw new Error("Session secret is not defined in the config");
  }
  const sessionSalt = config.env.app.sessionSalt?.toString();
  if (!sessionSalt) {
    throw new Error("Session salt is not defined in the config");
  }
  app.register(require("fastify-healthcheck"));
  app.setErrorHandler(
    (error: Error, request: FastifyRequest, reply: FastifyReply) => {
      console.log(error.toString());
      reply.send({ error: error });
    }
  );
  app.register(cors);
  app.register(fastifyCookie);
  app.register(fastifySecureSession, {
    secret: sessionSecret,
    salt: sessionSalt,
    sessionName: config.env.app.sessionName,
    cookieName: config.env.app.cookieName,
    cookie: {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
      sameSite: "none",
      secure: true,
    },
  });
  // app.register(require("@fastify/flash"));
  app.register(fastifyPassport.initialize());
  app.register(fastifyPassport.secureSession());
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifySwagger, swaggerOptions);
  app.register(fastifySwaggerUi, swaggerUiOptions);
  redisPlugin(app, { url: "redis://127.0.0.1:6379" });

  // Register autoload for routes
  app.register(autoload, {
    dir: join(__dirname, "routes"),
    options: { prefix: "/api/v1" }, // Use a prefix for all routes
  });
  const data = db.selectFrom("settings").selectAll().execute();
  data.then((res: any) => {
    app.redis.set("settings", JSON.stringify(res));
  });
  // app.get(
  //   "/google/auth",
  //   {
  //     preValidation: fastifyPassport.authenticate("google", {
  //       scope: ["profile", "email"],
  //       state: "sds3sddd",
  //       failureRedirect: "/",
  //     }),
  //   },
  //   async (req: FastifyRequest, reply: FastifyReply) => {
  //     const { code, scope, authuser, prompt } = req.query as {
  //       code: string;
  //       scope: string;
  //       authuser: string;
  //       prompt: string;
  //     };
  //     console.log(code, scope, authuser, prompt);
  //   }
  // );
  app.get(
    "/auth/google/callback",
    {
      preValidation: fastifyPassport.authenticate("google", {
        scope: ["profile", "email"],
        state: "sds3sddd",
        failureRedirect: "/",
      }),
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { code, scope, authuser, prompt } = req.query as {
        code: string;
        scope: string;
        authuser: string;
        prompt: string;
      };
      console.log(req.user);
      // return reply.redirect(
      //   `/google/auth?code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`
      // );
      let accessToken = await createJWTToken(
        { user: req.user },
        `${parseInt(config.env.app.expiresIn)}h`
      );
      reply.setCookie("accessToken", accessToken.toString(), {
        path: "/",
        httpOnly: false,
        expires: new Date(Date.now() + 3600000),
        sameSite: "none",
        secure: true,
        domain: ".enactweb.com",
      });
      reply.send({ success: "true" });
    }
  );
  return app;
};

// Call the function with the Redis instance
const app: FastifyInstance = createApp();
export default app;
