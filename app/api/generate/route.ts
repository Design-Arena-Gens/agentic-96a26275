import { NextResponse } from "next/server";
import { runAgent } from "../../../lib/agent";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input = {
      productName: String(body.productName ?? "").slice(0, 120).trim(),
      category: String(body.category ?? "other"),
      price: Number(body.price ?? 0),
      condition: (body.condition === "used" ? "used" : "new") as "new" | "used",
      description: String(body.description ?? "").slice(0, 600).trim(),
      targetLocation: String(body.targetLocation ?? "").slice(0, 80).trim(),
      budget: Number(body.budget ?? 0),
      inventory: Number(body.inventory ?? 0),
      shippingOption: ["delivery", "pickup", "both"].includes(body.shippingOption)
        ? (body.shippingOption as "delivery" | "pickup" | "both")
        : "both",
      sellerStrength: String(body.sellerStrength ?? "").slice(0, 280).trim()
    };

    if (!input.productName || !input.description || !input.targetLocation) {
      return NextResponse.json(
        { error: "Incomplete product brief. कृपया सभी आवश्यक विवरण दें।" },
        { status: 400 }
      );
    }

    const response = runAgent({
      ...input,
      price: Number.isFinite(input.price) && input.price > 0 ? input.price : 0,
      budget: Number.isFinite(input.budget) && input.budget > 0 ? input.budget : 0,
      inventory:
        Number.isFinite(input.inventory) && input.inventory > 0
          ? Math.round(input.inventory)
          : 0
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Agent generation error", error);
    return NextResponse.json(
      { error: "Agent failed to generate output." },
      { status: 500 }
    );
  }
}
