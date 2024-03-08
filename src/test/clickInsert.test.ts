// Imports
import request from "supertest";
import app from "../app";
import { createJWTToken } from "../routes/auth/jwt";

// Generate test user and JWT
const user = {
  id: 1,
  email: "test@example.com",
};
const token = createJWTToken(user, "30d");
const createApp = async () => {
  await app.ready((err) => {
    if (err) throw err;

    // Start listening for requests
    app.listen({ port: 3000 }, (err: Error | null, address: string) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      app.log.info(`Server running on ${address}`);
    });
  });
  return app.server;
};
let server: any;
beforeAll(async () => {
  server = await createApp();
});

afterAll(async () => {
  await server.close();
});
describe("GET /click/insert", () => {
  it("should insert click when authenticated", async () => {
    const res = await request(await createApp())
      .get("/api/v1/task/click/insert")
      .set("cookie", `accessToken=${token}`)
      .set("accept", "application/json")
      .set("user-agent", "Vs code")
      .set("referer", "abcdefg")
      .set("countries", "us")
      .set("accept-language", "en")
      .query({
        platform: ["web"],
        network: "adgem",
        task_type: "signup",
        campaign_id: "1234",
      });
    console.log(res);
    expect(res.status).toEqual(201);
    expect(res.body.success).toEqual(1);
    expect(res.body.message).toEqual("Inserted Successfully");
  }, 10000);

  it("should fail when unauthenticated", async () => {
    const res = await request(await createApp())
      .get("/api/v1/task/click/insert")
      .send({
        platform: "web",
        network: "adgem",
        task_type: "signup",
        campaign_id: "1234",
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toEqual("Not authenticated");
  }, 10000);
});
