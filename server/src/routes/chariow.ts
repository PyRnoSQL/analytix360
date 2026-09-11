import { Router, Request, Response } from "express";

const router = Router();

const CHARIOW_API = "https://api.chariow.com/v1";

function getApiKey(): string {
  return process.env.CHARIOW_API_KEY || "";
}

// ─── Create Checkout Session ───
// Client sends: { productId, email, firstName, lastName, phone, countryCode, redirectUrl }
// Server calls Chariow API and returns checkout URL
router.post("/checkout", async (req: Request, res: Response) => {
  try {
    const { productId, email, firstName, lastName, phone, countryCode, redirectUrl } = req.body;

    if (!productId || !email || !firstName || !lastName) {
      res.status(400).json({ error: "Missing required fields: productId, email, firstName, lastName" });
      return;
    }

    const response = await fetch(`${CHARIOW_API}/checkout`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        email,
        first_name: firstName,
        last_name: lastName,
        phone: {
          number: (phone || "").replace(/\s/g, ""),
          country_code: countryCode || "CM",
        },
        redirect_url: redirectUrl || `${process.env.APP_URL || "https://analytix-eng.com"}/institute?payment=success&sale={sale_id}`,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Chariow checkout error:", result);
      res.status(response.status).json({ error: "Checkout failed", details: result });
      return;
    }

    // Return checkout URL or completion status
    if (result.data?.step === "payment" && result.data?.payment?.checkout_url) {
      res.json({ checkoutUrl: result.data.payment.checkout_url });
    } else if (result.data?.step === "completed") {
      res.json({ status: "completed", saleId: result.data.purchase?.id });
    } else if (result.data?.step === "already_purchased") {
      res.json({ status: "already_purchased", message: "You have already purchased this product" });
    } else {
      res.json(result.data);
    }
  } catch (err) {
    console.error("Chariow checkout error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── List Products from Chariow ───
router.get("/products", async (_req: Request, res: Response) => {
  try {
    const response = await fetch(`${CHARIOW_API}/products`, {
      headers: { "Authorization": `Bearer ${getApiKey()}` },
    });
    const result = await response.json();
    res.json(result.data || []);
  } catch (err) {
    console.error("Chariow products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ─── Webhook (Pulse) Handler ───
// Chariow sends sale.completed events here
router.post("/webhook", async (req: Request, res: Response) => {
  try {
    const { event, data } = req.body;
    console.log(`[Chariow Pulse] Event: ${event}`, JSON.stringify(data, null, 2));

    if (event === "sale.completed") {
      const { customer, product } = data;
      console.log(`[Chariow] Sale completed: ${customer?.email} purchased ${product?.name}`);

      // TODO: When Supabase is connected, auto-enroll student:
      // await supabase.from('enrollments').insert({
      //   student_email: customer.email,
      //   student_name: `${customer.first_name} ${customer.last_name}`,
      //   course_id: product.id,
      //   course_name: product.name,
      //   sale_id: data.id,
      //   amount: data.amount?.value,
      //   currency: data.amount?.currency,
      //   enrolled_at: new Date().toISOString(),
      //   status: 'active',
      // });
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Chariow webhook error:", err);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

export default router;
