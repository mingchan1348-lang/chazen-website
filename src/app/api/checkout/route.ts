import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const { productId } = await request.json();
  const product = getProduct(productId);

  if (!product) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: product.currency,
          unit_amount: product.amount,
          product_data: {
            name: product.title.en,
            description: product.description.en
          }
        },
        quantity: 1
      }
    ],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/tea-boxes`
  });

  return NextResponse.json({ url: session.url });
}
