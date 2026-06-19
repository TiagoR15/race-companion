import cors from "@fastify/cors";
import Fastify from "fastify";
import { registerLiveRoutes } from "./routes/live.js";
import { registerRaceRoutes } from "./routes/race.js";
import { registerTimerRoutes } from "./routes/timer.js";

const app = Fastify({ logger: true });

const allowedOrigins = [
  "http://localhost:3000",
  "https://reace-companion.vercel.app",
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

await app.register(cors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "HEAD", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
});

registerRaceRoutes(app);
registerTimerRoutes(app);
registerLiveRoutes(app);

const port = Number(process.env.PORT ?? 3001);
await app.listen({ port, host: "0.0.0.0" });
