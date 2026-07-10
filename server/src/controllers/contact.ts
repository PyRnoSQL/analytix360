import type { Request, Response } from "express";
import { supabaseAdmin } from "../middleware/auth.js";

export const contactController = {
  async submit(req: Request, res: Response) {
    try {
      const { name, email, company, service, message } = req.body;

      // Basic validation
      if (!name || !email || !message) {
        res.status(400).json({
          error: { message: "Name, email, and message are required", code: "VALIDATION_ERROR" },
        });
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          error: { message: "Invalid email address", code: "VALIDATION_ERROR" },
        });
        return;
      }

      // Store in Supabase (create a contact_submissions table or use messages)
      const { error } = await supabaseAdmin.from("messages").insert({
        sender_id: "00000000-0000-0000-0000-000000000000", // System/anonymous
        recipient_id: "00000000-0000-0000-0000-000000000001", // Admin
        subject: `Contact Form: ${service || "General"} — ${name}`,
        body: `From: ${name} <${email}>\nCompany: ${company || "N/A"}\nService: ${service || "N/A"}\n\n${message}`,
        is_read: false,
      });

      if (error) {
        console.error("[CONTACT] Failed to store submission:", error);
      }

      // TODO: Send email notification via EmailJS, Resend, or SMTP
      // await sendContactNotification({ name, email, company, service, message });

      // Audit log
      await supabaseAdmin.from("audit_logs").insert({
        user_id: "anonymous",
        action: "contact_form_submitted",
        entity_type: "contact",
        entity_id: email,
        details: { name, company, service } as Record<string, unknown>,
      });

      res.status(200).json({ success: true, message: "Thank you for your message. We'll be in touch soon." });
    } catch (error) {
      console.error("[CONTACT] Error:", error);
      res.status(500).json({ error: { message: "Failed to send message", code: "SERVER_ERROR" } });
    }
  },
};
