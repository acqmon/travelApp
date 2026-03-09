import { NextResponse } from "next/server";
import { Booking } from "@/lib/models/index.js";

export async function POST(req) {
  try {
    const body = await req.json();

    const { packageId, bookingDate, totalPrice } = body;

    // get userId from cookies
    const userId = req.cookies.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", code: 401 },
        { status: 401 },
      );
    }

    if (!packageId || !bookingDate || !totalPrice) {
      return NextResponse.json(
        { message: "Missing required fields", code: 400 },
        { status: 400 },
      );
    }

    const newBooking = await Booking.create({
      userId,
      packageId,
      bookingDate,
      totalPrice,
      statusId: "e7d84520-0875-47f4-afa8-f527942f24b2",
    });

    return NextResponse.json(
      {
        message: "Booking created successfully",
        data: newBooking,
        code: 201,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message,
        code: 500,
      },
      { status: 500 },
    );
  }
}
