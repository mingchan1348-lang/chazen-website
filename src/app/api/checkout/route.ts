import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

const checkoutSiteUrl = (
  process.env.CHECKOUT_SITE_URL ?? "https://kritinrautela.github.io/ming"
).replace(/\/$/, "");

const allowedOrigins = new Set([
  "https://kritinrautela.github.io",
  "https://chazen-website.vercel.app",
  "http://localhost:3000"
]);

function corsHeaders(request: NextRequest) {
  const origin = request.headers.get("origin");

  return {
    ...(origin && allowedOrigins.has(origin)
      ? { "Access-Control-Allow-Origin": origin }
      : {}),
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin"
  };
}

function json(request: NextRequest, body: object, status: number) {
  return NextResponse.json(body, {
    status,
    headers: corsHeaders(request)
  });
}

export function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !allowedOrigins.has(origin)) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request)
  });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !allowedOrigins.has(origin)) {
    return json(request, { error: "Origin not allowed" }, 403);
  }

  let productId: unknown;

  try {
    ({ productId } = await request.json());
  } catch {
    return json(request, { error: "Invalid request body" }, 400);
  }

  const product = typeof productId === "string" ? getProduct(productId) : undefined;

  if (!product) {
    return json(request, { error: "Unknown product" }, 400);
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return json(request, { error: "Checkout is not configured" }, 503);
  }

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      customer_creation: "always",
      shipping_address_collection: {
        allowed_countries: ["AU"]
      },
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
      metadata: { productId: product.id },
      payment_intent_data: {
        metadata: { productId: product.id }
      },
      success_url: `${checkoutSiteUrl}/checkout/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${checkoutSiteUrl}/tea-boxes/`
    });

    return json(request, { url: session.url }, 200);
  } catch (error) {
    console.error("Failed to create Stripe Checkout session", error);
    return json(request, { error: "Unable to start checkout" }, 502);
  }
}
