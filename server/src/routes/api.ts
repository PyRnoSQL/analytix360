import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { paymentController } from "../controllers/payment.js";
import { contactController } from "../controllers/contact.js";

export const apiRouter = Router();

// ─── Rate Limiting ───
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: { message: "Too many requests", code: "RATE_LIMITED" } },
});

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: { message: "Too many payment requests", code: "RATE_LIMITED" } },
});

apiRouter.use(apiLimiter);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  OPTION A: MINIMAL — Only payment + contact endpoints
//  The React client talks directly to Supabase for CRUD.
//  The server handles only sensitive operations.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Payment endpoints (always server-side — API keys must not be in the client)
apiRouter.post("/payments/create-session", requireAuth, paymentLimiter, paymentController.createSession);
apiRouter.get("/payments/:paymentId/status", requireAuth, paymentController.checkStatus);

// Contact form (server-side to prevent spam + send email)
apiRouter.post("/contact", contactController.submit);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  OPTION B: FULL API LAYER — All requests route through Express
//  Uncomment to proxy all CRUD through the server instead of
//  having the client talk to Supabase directly.
//
//  Pros: Single API surface, easier to add business logic,
//        audit logging, custom validation per endpoint.
//  Cons: More code to maintain, slightly higher latency.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
import { projectController } from "../controllers/project.js";
import { trainingController } from "../controllers/training.js";
import { invoiceController } from "../controllers/invoice.js";
import { documentController } from "../controllers/document.js";
import { messageController } from "../controllers/message.js";
import { adminController } from "../controllers/admin.js";

// Projects
apiRouter.get("/projects", requireAuth, projectController.list);
apiRouter.get("/projects/:id", requireAuth, projectController.getById);
apiRouter.post("/projects", requireAuth, requireRole("admin", "staff"), projectController.create);
apiRouter.patch("/projects/:id", requireAuth, requireRole("admin", "staff"), projectController.update);

// Training
apiRouter.get("/trainings", trainingController.listActive);
apiRouter.get("/trainings/:id", trainingController.getById);
apiRouter.post("/enrollments", requireAuth, trainingController.enroll);
apiRouter.get("/enrollments", requireAuth, trainingController.myEnrollments);

// Invoices
apiRouter.get("/invoices", requireAuth, invoiceController.list);
apiRouter.get("/invoices/:id", requireAuth, invoiceController.getById);
apiRouter.post("/invoices", requireAuth, requireRole("admin", "staff"), invoiceController.create);

// Documents
apiRouter.get("/documents", requireAuth, documentController.list);
apiRouter.get("/documents/:id/download", requireAuth, documentController.download);
apiRouter.post("/documents/upload", requireAuth, requireRole("admin", "staff"), documentController.upload);

// Messages
apiRouter.get("/messages", requireAuth, messageController.list);
apiRouter.post("/messages", requireAuth, messageController.send);
apiRouter.patch("/messages/:id/read", requireAuth, messageController.markRead);

// Admin
apiRouter.get("/admin/stats", requireAuth, requireRole("admin", "super_admin"), adminController.stats);
apiRouter.get("/admin/users", requireAuth, requireRole("admin", "super_admin"), adminController.listUsers);
apiRouter.patch("/admin/users/:id/role", requireAuth, requireRole("super_admin"), adminController.updateRole);
*/
