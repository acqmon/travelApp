import { NextResponse } from "next/server";
import { Booking, Package, Status, User, Partner } from "@/lib/models";

export async function GET(req) {
  try {
    const userId = req.cookies.get("userId")?.value;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const offset = (page - 1) * limit;

    // Find partner linked to this user
    const partner = await Partner.findOne({
      where: { user_id: userId },
      attributes: ["id"],
    });

    if (!partner) {
      return NextResponse.json(
        { message: "Partner not found" },
        { status: 404 },
      );
    }

    const { rows, count } = await Booking.findAndCountAll({
      include: [
        {
          model: Package,
          as: "package",
          attributes: ["id", "name", "type", "price"],
          where: { partner_id: partner.id },
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: Status,
          as: "status",
          attributes: ["id", "name", "code"],
        },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);

    return NextResponse.json({
      data: rows,
      pagination: {
        totalRows: count,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("GET PARTNER BOOKINGS ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
