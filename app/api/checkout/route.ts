import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }
  const stripe = new Stripe(secretKey);

  const { priceId } = await req.json();
  if (!priceId) {
    return NextResponse.json({ error: "priceId is required" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/shop?success=1`,
    cancel_url: `${origin}/shop`,
  });

  return NextResponse.json({ url: session.url });
}
