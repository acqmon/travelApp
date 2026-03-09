import { NextResponse } from "next/server";
import { Booking, Package, Status } from "@/lib/models";

export async function GET(req) {
  try {
    const userId = req.cookies.get("userId")?.value;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bookings = await Booking.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Package,
          as: "package",
          attributes: ["id", "name", "type", "price", "startDate", "endDate"],
        },
        {
          model: Status,
          as: "status",
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return NextResponse.json({
      data: bookings,
      code: 200,
    });
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
