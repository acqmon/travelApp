import { NextResponse } from "next/server";
import { Package, Status } from "@/lib/models/index.js"; // import from centralized index.js
import { Partner } from "@/lib/models/index.js";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const partnerId = url.searchParams.get("partnerId"); // partner querying own packages
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    if (!partnerId) {
      return NextResponse.json({ error: "partnerId is required", status: 400 });
    }

    const { count, rows } = await Package.findAndCountAll({
      where: { partnerId },
      include: [
        { model: Status, as: "status", attributes: ["id", "name", "code"] },
      ],
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    return NextResponse.json({
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
      code: 200,
    });
  } catch (error) {
    console.error("GET PACKAGES ERROR:", error);
    return NextResponse.json({ error: error.message, code: 500 });
  }
}
