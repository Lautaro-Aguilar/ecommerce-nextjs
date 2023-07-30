import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
  const headersList = headers();
  const origin = headersList.get("origin");
  const request = await req.json();
  try {
    const lineItems = request.map((item) => {
      const img = item.image[0].asset._ref;
      const newImage = img
        .replace("image-", "https://cdn.sanity.io/images/2q5exs4w/production/")
        .replace("-webp", ".webp");
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [newImage],
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1NZMsSAF6Rp5fMPOnTZ0rYhZ" }],
      line_items: lineItems,
      success_url: `${origin}/success`,
      cancel_url: `${origin}/product/${request[0].slug.current}`,
    };

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ session });
  } catch (err) {
    return NextResponse.json({ message: err });
  }
}
