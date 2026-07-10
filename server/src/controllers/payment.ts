import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.js";
import { paymentService } from "../services/payment.js";
import { supabaseAdmin } from "../middleware/auth.js";
import { env } from "../utils/env.js";

export const paymentController = {
  /**
   * Create a new payment session with the payment provider.
   * Returns QR code data and payment URL for the client.
   */
  async createSession(req: AuthenticatedRequest, res: Response) {
    try {
      const { invoice_id, amount, currency, description } = req.body;
      const customerId = req.userId!;

      // Validate invoice belongs to customer
      const { data: invoice, error: invoiceError } = await supabaseAdmin
        .from("invoices")
        .select("*")
        .eq("id", invoice_id)
        .eq("customer_id", customerId)
        .single();

      if (invoiceError || !invoice) {
        res.status(404).json({ error: { message: "Invoice not found", code: "NOT_FOUND" } });
        return;
      }

      // Generate unique transaction reference
      const reference = `AX360-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

      // Create session with payment provider
      const session = await paymentService.createSession({
        amount: amount || (invoice as Record<string, unknown>).amount as number,
        currency: currency || "XAF",
        description: description || `Invoice ${(invoice as Record<string, unknown>).reference}`,
        reference,
        returnUrl: `${env.APP_URL}/portal/invoices?payment=success`,
        notifyUrl: `${env.APP_URL}/api/webhooks/cinetpay`,
        customerName: "", // Will be fetched from profile
        customerEmail: "", // Will be fetched from profile
      });

      // Create payment record in database
      await supabaseAdmin.from("payments").insert({
        invoice_id,
        customer_id: customerId,
        amount: amount || (invoice as Record<string, unknown>).amount,
        currency: currency || "XAF",
        method: "mtn_momo", // Will be determined by what the customer selects
        status: "pending",
        gateway_ref: reference,
        qr_code_data: session.paymentUrl,
        expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min
      });

      res.json({
        payment_id: reference,
        payment_url: session.paymentUrl,
        qr_code_data: session.paymentUrl,
        expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      });
    } catch (error) {
      console.error("[PAYMENT] Create session error:", error);
      res.status(500).json({ error: { message: "Failed to create payment session", code: "PAYMENT_ERROR" } });
    }
  },

  /**
   * Check payment status by payment/transaction ID.
   */
  async checkStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const { paymentId } = req.params;

      const { data: payment, error } = await supabaseAdmin
        .from("payments")
        .select("*")
        .eq("gateway_ref", paymentId)
        .single();

      if (error || !payment) {
        res.status(404).json({ error: { message: "Payment not found", code: "NOT_FOUND" } });
        return;
      }

      // Optionally verify with gateway for real-time status
      // const gatewayStatus = await paymentService.verifyPayment(paymentId);

      res.json({
        payment_id: paymentId,
        status: (payment as Record<string, unknown>).status,
        amount: (payment as Record<string, unknown>).amount,
        currency: (payment as Record<string, unknown>).currency,
        created_at: (payment as Record<string, unknown>).created_at,
      });
    } catch (error) {
      console.error("[PAYMENT] Check status error:", error);
      res.status(500).json({ error: { message: "Failed to check payment status", code: "PAYMENT_ERROR" } });
    }
  },
};
