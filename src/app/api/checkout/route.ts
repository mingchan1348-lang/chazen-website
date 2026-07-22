import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
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

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json(request, { error: "Invalid request body" }, 400);
  }

  const rawItems = isRecord(body) && Array.isArray(body.items)
    ? body.items
    : isRecord(body) && typeof body.productId === "string"
      ? [{ productId: body.productId, quantity: 1 }]
      : undefined;

  if (!rawItems || rawItems.length === 0) {
    return json(request, { error: "No items in request" }, 400);
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const rawItem of rawItems) {
    if (!isRecord(rawItem) || typeof rawItem.productId !== "string") {
      return json(request, { error: "Invalid item" }, 400);
    }

    const product = getProduct(rawItem.productId);
    const quantity =
      typeof rawItem.quantity === "number" && Number.isInteger(rawItem.quantity) && rawItem.quantity > 0
        ? Math.min(rawItem.quantity, 20)
        : 1;

    if (!product) {
      return json(request, { error: `Unknown product: ${rawItem.productId}` }, 400);
    }

    lineItems.push({
      price_data: {
        currency: product.currency,
        unit_amount: product.amount,
        product_data: {
          name: product.title.en,
          description: product.description.en
        }
      },
      quantity
    });
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
      line_items: lineItems,
      metadata: { productIds: lineItems.map((item) => item.price_data?.product_data?.name).join(", ") },
      success_url: `${checkoutSiteUrl}/checkout/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${checkoutSiteUrl}/`
    });

    return json(request, { url: session.url }, 200);
  } catch (error) {
    console.error("Failed to create Stripe Checkout session", error);
    return json(request, { error: "Unable to start checkout" }, 502);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
