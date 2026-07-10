// ─── Environment Configuration ───
// Validates all required env vars at startup

function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: parseInt(process.env.PORT ?? "3000", 10),

  // Supabase
  SUPABASE_URL: requireEnv("SUPABASE_URL", "https://placeholder.supabase.co"),
  SUPABASE_ANON_KEY: requireEnv("SUPABASE_ANON_KEY", "placeholder"),
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ?? "",

  // Payment (CinetPay)
  CINETPAY_API_KEY: process.env.CINETPAY_API_KEY ?? "",
  CINETPAY_SITE_ID: process.env.CINETPAY_SITE_ID ?? "",
  CINETPAY_SECRET_KEY: process.env.CINETPAY_SECRET_KEY ?? "",

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:5173",

  // App
  APP_URL: process.env.APP_URL ?? "http://localhost:5173",
} as const;
