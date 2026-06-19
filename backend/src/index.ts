import Fastify from "fastify";
import { registerLiveRoutes } from "./routes/live.js";
import { registerRaceRoutes } from "./routes/race.js";
import { registerTimerRoutes } from "./routes/timer.js";

const app = Fastify({ logger: true });

app.addHook("onRequest", async (request, reply) => {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PATCH, PUT, DELETE, OPTIONS");
  reply.header("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "OPTIONS") {
    reply.code(204).send();
  }
});

registerRaceRoutes(app);
registerTimerRoutes(app);
registerLiveRoutes(app);

const port = Number(process.env.PORT ?? 3001);
await app.listen({ port, host: "0.0.0.0" });
