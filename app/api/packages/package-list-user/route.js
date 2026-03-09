import { NextResponse } from "next/server";
import { Package, Status, Partner } from "@/lib/models/index.js";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const { count, rows } = await Package.findAndCountAll({
      include: [
        { model: Status, as: "status", attributes: ["id", "name", "code"] },
        { model: Partner, as: "partner", attributes: ["id", "companyName"] },
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
    console.error("GET PACKAGES USER ERROR:", error);
    return NextResponse.json({ error: error.message, code: 500 });
  }
}
