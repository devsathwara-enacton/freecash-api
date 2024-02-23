import { FastifyReply, FastifyRequest } from "fastify";
import { decodeToken } from "../routes/auth/jwt";
import * as auth from "../routes/auth/auth.model";

export const isAuthenticated = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    reply.status(401).send({ error: "Not authenticated" });
    return; // Stop execution to prevent calling the next handler
  }
  const decoded = await decodeToken(reply, accessToken);
  const userExist = await auth.login(decoded.email);
  if (!userExist) {
    reply.status(404).send({ error: "User Not Found" });
    return; // Stop execution to prevent calling the next handler
  }
  // If the function reaches this point, the user is authenticated,
  // and you don't need to explicitly call done or return anything.
};
