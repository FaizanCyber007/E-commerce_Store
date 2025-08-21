import asyncHandler from "express-async-handler";
import Stripe from "stripe";

// Initialize Stripe with error handling for demo/development
let stripe;
try {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey || stripeKey.includes("demo") || stripeKey.includes("xxx")) {
    console.warn(
      "⚠️  Using demo Stripe configuration. Replace with actual keys for production."
    );
    // Create a mock stripe for development
    stripe = {
      checkout: {
        sessions: {
          create: async () => ({
            id: "cs_demo_session_id",
            url: "https://checkout.stripe.com/demo",
            payment_status: "unpaid",
          }),
        },
      },
    };
  } else {
    stripe = new Stripe(stripeKey);
  }
} catch (error) {
  console.error("❌ Stripe initialization error:", error.message);
  stripe = null;
}

export const createCheckoutSession = asyncHandler(async (req, res) => {
  if (!stripe) {
    return res.status(500).json({
      success: false,
      message: "Payment system not configured. Please contact support.",
    });
  }

  const { items, successUrl, cancelUrl } = req.body;

  // Validate required fields
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Items are required for checkout",
    });
  }

  const line_items = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        description: item.description || "",
        images: item.image ? [item.image] : [],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.qty || 1,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: successUrl || `${process.env.CLIENT_URL}/checkout/success`,
    cancel_url: cancelUrl || `${process.env.CLIENT_URL}/checkout/cancel`,
    customer_email: req.user?.email,
    metadata: {
      userId: req.user?._id?.toString() || "guest",
      orderData: JSON.stringify(items),
    },
  });

  res.json({
    success: true,
    sessionId: session.id,
    url: session.url,
  });
});

// Webhook endpoint to handle Stripe events
export const handleWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || webhookSecret.includes("demo")) {
    console.log("⚠️  Webhook received but using demo configuration");
    return res.status(200).json({ received: true });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle different event types
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("✅ Payment successful:", session.id);
      // Here you would create the order in your database
      break;
    case "payment_intent.payment_failed":
      console.log("❌ Payment failed:", event.data.object.id);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Get Stripe publishable key for frontend
export const getStripeConfig = asyncHandler(async (req, res) => {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey || publishableKey.includes("demo")) {
    return res.json({
      success: true,
      publishableKey: "pk_test_demo_key_for_development",
      isDemo: true,
    });
  }

  res.json({
    success: true,
    publishableKey,
    isDemo: false,
  });
});
