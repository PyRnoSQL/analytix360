import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { healthRouter } from "./routes/health.js";
import { apiRouter } from "./routes/api.js";
import { webhookRouter } from "./routes/webhooks.js";
import { errorHandler, notFoundHandler } from "./middleware/error.js";
import { env } from "./utils/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ─── Security ───
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: [
          "'self'",
          env.SUPABASE_URL,
          "https://*.supabase.co",
          "https://api.cinetpay.com",
        ],
      },
    },
  })
);

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

// ─── Middleware ───
app.use(compression());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

// Webhooks need raw body for signature verification — mount BEFORE json parser
app.use("/api/webhooks", webhookRouter);

// JSON/URL-encoded parsing for everything else
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ─── API Routes ───
app.use("/api/health", healthRouter);
app.use("/api", apiRouter);

// ─── Serve React SPA (production) ───
const clientDist = path.resolve(__dirname, "../../client/dist");

app.use(express.static(clientDist, { maxAge: "1y", immutable: true }));

// SPA fallback: any non-API route serves index.html
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

// ─── Error Handling ───
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Start ───
const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║       Analytix360 Server Running         ║
  ║──────────────────────────────────────────║
  ║  Port:    ${String(PORT).padEnd(30)}║
  ║  Mode:    ${env.NODE_ENV.padEnd(30)}║
  ║  Health:  http://localhost:${PORT}/api/health  ║
  ╚══════════════════════════════════════════╝
  `);
});

export default app;
