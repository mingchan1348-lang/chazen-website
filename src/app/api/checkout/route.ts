import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  let productId: unknown;

  try {
    ({ productId } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const product = typeof productId === "string" ? getProduct(productId) : undefined;

  if (!product) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Checkout is not configured" },
      { status: 503 }
    );
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  try {
    const session = await getStripe().checkout.sessions.create({
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
  } catch (error) {
    console.error("Failed to create Stripe Checkout session", error);
    return NextResponse.json(
      { error: "Unable to start checkout" },
      { status: 502 }
    );
  }
}
