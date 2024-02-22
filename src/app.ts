import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { join } from "path";
import autoload from "@fastify/autoload";
import { Kysely } from "kysely";
import { DB } from "kysely-codegen/dist/db";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  createJsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifyCookie from "@fastify/cookie";
import fastifySecureSession from "@fastify/secure-session";
import fastifyPassport from "@fastify/passport";
import "./utils/passport";
import cors from "@fastify/cors";
import { config } from "./config/config";
import axios from "axios";
import { createJWTToken, decodeToken, validateJWTToken } from "./utils/jwt";
import { db } from "./database/database";
interface CustomFastifyInstance extends FastifyInstance {
  db: Kysely<DB>;
}

const createApp = (): CustomFastifyInstance => {
  const app = fastify({ logger: true }) as unknown as CustomFastifyInstance;
  app.decorate("db", db);
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
      httpOnly: false,
      expires: new Date(Date.now() + 3600000),
      sameSite: "none",
      secure: true,
      // domain: ".enactweb.com",
    },
  });
  // app.register(require("@fastify/flash"));
  app.register(fastifyPassport.initialize());
  app.register(fastifyPassport.secureSession());
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "SampleApi",
        description: "Sample backend service",
        version: "1.0.0",
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
    // You can also create transform with custom skiplist of endpoints that should not be included in the specification:
    //
    // transform: createJsonSchemaTransform({
    //   skipList: [ '/documentation/static/*' ]
    // })
  });
  app.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
  });

  // Register autoload for routes
  app.register(autoload, {
    dir: join(__dirname, "routes"),
    options: { prefix: "/api/v1" }, // Use a prefix for all routes
  });
  app.get(
    "/google/auth",
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
      console.log(code, scope, authuser, prompt);
    }
  );
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
      console.log(req.query);
      return reply.redirect(
        `/google/auth?code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`
      );
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
const app: CustomFastifyInstance = createApp();
export default app;
