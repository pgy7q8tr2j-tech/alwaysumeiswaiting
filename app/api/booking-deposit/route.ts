import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const depositPriceId = process.env.STRIPE_BOOKING_DEPOSIT_PRICE_ID;
    if (!depositPriceId) {
      return NextResponse.json({ error: "Price ID not configured" }, { status: 500 });
    }

    const stripe = new Stripe(secretKey);
    const origin = req.headers.get("origin") ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: depositPriceId, quantity: 1 }],
      success_url: `${origin}/booking?success=1`,
      cancel_url: `${origin}/booking`,
      metadata: { type: "booking_deposit" },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("booking-deposit error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
