import { Router } from "express";
import { env } from "../utils/env.js";
import { supabaseAdmin } from "../middleware/auth.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  const checks: Record<string, string> = {
    server: "ok",
    environment: env.NODE_ENV,
  };

  // Check Supabase connectivity
  try {
    const { error } = await supabaseAdmin.from("profiles").select("id").limit(1);
    checks.database = error ? `error: ${error.message}` : "ok";
  } catch {
    checks.database = "unreachable";
  }

  const healthy = checks.database === "ok";

  res.status(healthy ? 200 : 503).json({
    status: healthy ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    checks,
  });
});
