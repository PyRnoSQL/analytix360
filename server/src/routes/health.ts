import { Router } from "express";
import { env } from "../utils/env.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  const checks: Record<string, string> = {
    server: "ok",
    environment: env.NODE_ENV,
  };

  if (env.SUPABASE_URL.includes("placeholder")) {
    checks.database = "not_configured";
  } else {
    try {
      const { supabaseAdmin } = await import("../middleware/auth.js");
      const result = await Promise.race([
        supabaseAdmin.from("profiles").select("id").limit(1),
        new Promise<{ error: { message: string } }>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 5000)
        ),
      ]);
      checks.database = result.error ? `error: ${result.error.message}` : "ok";
    } catch {
      checks.database = "unreachable";
    }
  }

  res.status(200).json({
    status: checks.database === "ok" ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    checks,
  });
});