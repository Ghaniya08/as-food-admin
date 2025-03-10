import { NextResponse } from "next/server";
import { client } from "@/lib/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 Received Data:", body);

    const { _id, name, category, price, originalPrice, description, available } = body;

    // Check if product ID exists
    if (!_id) {
      console.log("❌ Missing Product ID");
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    console.log("🔄 Updating Product in Sanity:", _id);

    // Update product in Sanity
    const updatedProduct = await client
      .patch(_id)
      .set({
        ...(name && { name }),
        ...(category && { category }),
        ...(price !== undefined && { price }),
        ...(originalPrice !== undefined && { originalPrice }),
        ...(description && { description }),
        ...(available !== undefined && { available }),
      })
      .commit();

    console.log("✅ Update Success:", updatedProduct);

    return NextResponse.json(
      { message: "Product updated successfully", updatedProduct },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { message: "Failed to update product", error: error.toString() },
      { status: 500 }
    );
  }
}
