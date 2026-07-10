import type { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import { env } from "../utils/env.js";

// Service-role client for server-side operations
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY || env.SUPABASE_ANON_KEY);

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole?: string;
}

/**
 * Middleware: Verify Supabase JWT from Authorization header.
 * Attaches userId and userRole to req.
 */
export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: { message: "Missing authorization token", code: "UNAUTHORIZED" } });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) {
      res.status(401).json({ error: { message: "Invalid or expired token", code: "UNAUTHORIZED" } });
      return;
    }

    req.userId = data.user.id;

    // Fetch profile for role
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    req.userRole = profile?.role ?? "customer";
    next();
  } catch {
    res.status(401).json({ error: { message: "Authentication failed", code: "AUTH_ERROR" } });
  }
}

/**
 * Middleware: Require specific roles.
 */
export function requireRole(...roles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      res.status(403).json({ error: { message: "Insufficient permissions", code: "FORBIDDEN" } });
      return;
    }
    next();
  };
}
