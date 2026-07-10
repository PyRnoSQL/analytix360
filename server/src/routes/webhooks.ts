import { Router } from "express";
import express from "express";
import { paymentService } from "../services/payment.js";
import { supabaseAdmin } from "../middleware/auth.js";

export const webhookRouter = Router();

// Raw body parser for webhook signature verification
webhookRouter.use(express.raw({ type: "application/json" }));

/**
 * CinetPay payment notification webhook.
 * Called by CinetPay when a payment status changes.
 */
webhookRouter.post("/cinetpay", async (req, res) => {
  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body instanceof Buffer
          ? JSON.parse(req.body.toString())
          : req.body;

    const { cpm_trans_id, cpm_site_id } = body;

    if (!cpm_trans_id) {
      res.status(400).json({ error: "Missing transaction ID" });
      return;
    }

    console.log(`[WEBHOOK] CinetPay notification: ${cpm_trans_id}`);

    // Verify payment with CinetPay
    const status = await paymentService.verifyPayment(cpm_trans_id, cpm_site_id);

    // Update payment record in database
    if (status.status === "ACCEPTED") {
      await supabaseAdmin
        .from("payments")
        .update({
          status: "completed",
          gateway_ref: cpm_trans_id,
          gateway_response: status as unknown as Record<string, unknown>,
        })
        .eq("gateway_ref", cpm_trans_id);

      // Mark invoice as paid
      const { data: payment } = await supabaseAdmin
        .from("payments")
        .select("invoice_id")
        .eq("gateway_ref", cpm_trans_id)
        .single();

      if (payment?.invoice_id) {
        await supabaseAdmin
          .from("invoices")
          .update({ status: "paid", paid_at: new Date().toISOString() })
          .eq("id", payment.invoice_id);
      }

      // Audit log
      await supabaseAdmin.from("audit_logs").insert({
        user_id: "system",
        action: "payment_completed",
        entity_type: "payment",
        entity_id: cpm_trans_id,
        details: status as unknown as Record<string, unknown>,
      });
    } else if (status.status === "REFUSED" || status.status === "CANCELLED") {
      await supabaseAdmin
        .from("payments")
        .update({
          status: "failed",
          gateway_response: status as unknown as Record<string, unknown>,
        })
        .eq("gateway_ref", cpm_trans_id);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("[WEBHOOK] Error processing CinetPay notification:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

/**
 * Generic webhook endpoint for future payment providers
 * (Flutterwave, PayDunya, etc.)
 */
webhookRouter.post("/payment/:provider", async (req, res) => {
  const { provider } = req.params;
  console.log(`[WEBHOOK] ${provider} notification received`);

  // TODO: Implement per-provider webhook handling
  res.status(200).json({ received: true, provider });
});
