import { NextResponse } from "next/server";
import { Package } from "@/lib/models/index.js"; // centralized index.js
import { Status } from "@/lib/models/index.js";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = ["partnerId", "name", "type", "price", "statusId"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({
          error: `${field} is required`,
          status: 400,
        });
      }
    }

    const newPackage = await Package.create({
      partnerId: body.partnerId,
      name: body.name,
      type: body.type,
      description: body.description || null,
      price: body.price,
      startDate: body.startDate || null,
      endDate: body.endDate || null,
      statusId: body.statusId,
    });

    return NextResponse.json({ data: newPackage, code: 201 });
  } catch (error) {
    console.error("CREATE PACKAGE ERROR:", error);
    return NextResponse.json({ error: error.message, code: 500 });
  }
}
