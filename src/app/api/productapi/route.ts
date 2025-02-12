import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2023-01-01",
  token: process.env.SANITY_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData(); // FormData receive karo
    console.log("📥 Received FormData:", formData);

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = Number(formData.get("price"));
    const originalPrice = Number(formData.get("originalPrice"));
    const tags = formData.get("tags") as string;
    const description = formData.get("description") as string;
    const available = formData.get("available") === "true";
    const image = formData.get("image") as File | null;

    let imageRef = null;
    if (image) {
      console.log("📷 Uploading Image...");
      const imageUpload = await client.assets.upload("image", image);
      imageRef = { _type: "image", asset: { _ref: imageUpload._id } };
      console.log("✅ Image Uploaded:", imageUpload._id);
    }

    const product = await client.create({
      _type: "food",
      name,
      category,
      price,
      originalPrice,
      tags: tags ? tags.split(",") : [],
      description,
      available,
      image: imageRef,
    });

    console.log("✅ Product Created Successfully:", product);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json({ message: "Error adding product", error: error.message }, { status: 500 });
  }
}
