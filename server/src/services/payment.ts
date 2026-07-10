import { env } from "../utils/env.js";

// ─── Provider Interface ───
// Any payment provider (CinetPay, Flutterwave, PayDunya) implements this.

interface CreateSessionParams {
  amount: number;
  currency: string;
  description: string;
  reference: string;
  returnUrl: string;
  notifyUrl: string;
  customerName: string;
  customerEmail: string;
}

interface SessionResult {
  paymentUrl: string;
  token: string;
}

interface VerifyResult {
  status: "ACCEPTED" | "REFUSED" | "CANCELLED" | "PENDING";
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionId: string;
}

// ─── CinetPay Provider ───

async function cinetPayCreateSession(params: CreateSessionParams): Promise<SessionResult> {
  const response = await fetch("https://api-checkout.cinetpay.com/v2/payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: env.CINETPAY_API_KEY,
      site_id: env.CINETPAY_SITE_ID,
      transaction_id: params.reference,
      amount: params.amount,
      currency: params.currency,
      description: params.description,
      return_url: params.returnUrl,
      notify_url: params.notifyUrl,
      customer_name: params.customerName || "Customer",
      customer_email: params.customerEmail || "",
      channels: "ALL",
    }),
  });

  const data = (await response.json()) as Record<string, unknown>;

  if (data.code !== "201") {
    throw new Error(`CinetPay error: ${data.message ?? "Unknown error"}`);
  }

  const paymentData = data.data as Record<string, unknown>;
  return {
    paymentUrl: paymentData.payment_url as string,
    token: paymentData.payment_token as string,
  };
}

async function cinetPayVerify(transactionId: string, siteId?: string): Promise<VerifyResult> {
  const response = await fetch("https://api-checkout.cinetpay.com/v2/payment/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: env.CINETPAY_API_KEY,
      site_id: siteId || env.CINETPAY_SITE_ID,
      transaction_id: transactionId,
    }),
  });

  const data = (await response.json()) as Record<string, unknown>;
  const paymentData = data.data as Record<string, unknown>;

  return {
    status: paymentData.status as VerifyResult["status"],
    amount: paymentData.amount as number,
    currency: paymentData.currency as string,
    paymentMethod: paymentData.payment_method as string,
    transactionId: transactionId,
  };
}

// ─── Provider-Agnostic Service ───
// Swap providers by changing the env var, no code changes needed.

export const paymentService = {
  async createSession(params: CreateSessionParams): Promise<SessionResult> {
    // Add more providers here as needed
    // if (env.PAYMENT_PROVIDER === "flutterwave") return flutterwaveCreateSession(params);
    // if (env.PAYMENT_PROVIDER === "paydunya") return paydunyaCreateSession(params);
    return cinetPayCreateSession(params);
  },

  async verifyPayment(transactionId: string, siteId?: string): Promise<VerifyResult> {
    return cinetPayVerify(transactionId, siteId);
  },
};
