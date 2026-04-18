import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 予約金: 5,000円（固定）
// Stripeダッシュボードで作成した予約金用 Price ID を環境変数に設定してください
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  const depositPriceId = process.env.STRIPE_BOOKING_DEPOSIT_PRICE_ID;

  if (!depositPriceId) {
    return NextResponse.json(
      { error: "Booking deposit price not configured" },
      { status: 500 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: depositPriceId, quantity: 1 }],
    success_url: `${origin}/booking?success=1`,
    cancel_url: `${origin}/booking`,
    metadata: {
      type: "booking_deposit",
    },
  });

  return NextResponse.json({ url: session.url });
}
