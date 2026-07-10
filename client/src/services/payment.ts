import { supabase } from "@/config/supabase";
import { PAYMENT_CONFIG } from "@/config/constants";
import type { Invoice, Payment } from "@/types";

// ─── Types ───
export interface PaymentRequest {
  invoiceId: string;
  amount: number;
  currency?: string;
  description: string;
  customerEmail: string;
  customerName: string;
  method?: Payment["method"];
}

export interface PaymentSession {
  transactionId: string;
  paymentUrl: string;
  qrCodeData: string;
  expiresAt: string;
  reference: string;
}

export interface PaymentStatus {
  status: Payment["status"];
  transactionId: string;
  amount: number;
  method: string;
  paidAt: string | null;
}

// ─── CinetPay Integration ───
// In production, these calls go through YOUR backend (Supabase Edge Function)
// to protect API keys. The frontend never calls CinetPay directly.

/**
 * Initialize a payment session via your Supabase Edge Function.
 * The Edge Function calls CinetPay's /payment API and returns
 * a session with QR code data.
 */
export async function createPaymentSession(
  request: PaymentRequest
): Promise<PaymentSession> {
  // Call your Supabase Edge Function
  const { data, error } = await supabase.functions.invoke("create-payment", {
    body: {
      invoice_id: request.invoiceId,
      amount: request.amount,
      currency: request.currency ?? PAYMENT_CONFIG.currency,
      description: request.description,
      customer_email: request.customerEmail,
      customer_name: request.customerName,
      method: request.method,
      channels: PAYMENT_CONFIG.channels,
      return_url: `${window.location.origin}/portal/invoices`,
      notify_url: `${window.location.origin}/api/webhooks/payment`,
    },
  });

  if (error) throw new Error(error.message);
  return data as PaymentSession;
}

/**
 * Check payment status. Call this from a polling interval or
 * after receiving a realtime notification.
 */
export async function checkPaymentStatus(
  transactionId: string
): Promise<PaymentStatus> {
  const { data, error } = await supabase.functions.invoke("check-payment", {
    body: { transaction_id: transactionId },
  });

  if (error) throw new Error(error.message);
  return data as PaymentStatus;
}

/**
 * Generate a unique transaction reference.
 * Format: AE-YYYY-XXXXXX
 */
export function generateReference(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `AE-${year}-${random}`;
}

/**
 * Build QR code payload for dynamic payment.
 * This encodes payment details into a string that
 * mobile money apps and banking apps can parse.
 */
export function buildQRPayload(params: {
  reference: string;
  amount: number;
  currency: string;
  merchantName: string;
  merchantId: string;
}): string {
  // EMVCo-style payload structure
  return JSON.stringify({
    type: "payment",
    merchant: params.merchantName,
    merchant_id: params.merchantId,
    amount: params.amount,
    currency: params.currency,
    reference: params.reference,
    timestamp: new Date().toISOString(),
  });
}

// ─── Invoice helpers ───

export async function getCustomerInvoices(
  customerId: string
): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Invoice[];
}

export async function getPaymentHistory(
  customerId: string
): Promise<Payment[]> {
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Payment[];
}

/**
 * Poll for payment completion.
 * Returns a cleanup function to stop polling.
 */
export function pollPaymentStatus(
  transactionId: string,
  onUpdate: (status: PaymentStatus) => void,
  intervalMs = 3000
): () => void {
  const timer = setInterval(async () => {
    try {
      const status = await checkPaymentStatus(transactionId);
      onUpdate(status);
      if (status.status === "completed" || status.status === "failed") {
        clearInterval(timer);
      }
    } catch {
      // Silently retry on network errors
    }
  }, intervalMs);

  return () => clearInterval(timer);
}

// ─── Format helpers ───

export function formatCurrency(amount: number, currency = "XAF"): string {
  return `${amount.toLocaleString("fr-FR")} ${currency === "XAF" ? "FCFA" : currency}`;
}
