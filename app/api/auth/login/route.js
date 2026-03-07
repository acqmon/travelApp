import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import { sequelize } from "../../../../lib/db/sequelize.js";
// import { User, Role, Status } from "../../../../lib/models/index.js";
// import { StatusConstants } from "../../../../constants/api.constants.js";
import { sequelize } from "@/lib/db/sequelize.js";
import { User, Role, Status } from "../../../../lib/models/index.js";
import { StatusConstants } from "../../../../constants/api.constants.js";

export async function POST(req) {
  const transaction = await sequelize.transaction();

  try {
    const body = await req.json();
    const { email, password } = body;

    // 1️⃣ Validate input
    if (!email || !password) {
      await transaction.rollback();
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // 2️⃣ Find user
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "name", "email", "passwordHash"],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "code", "name"], //  only these columns
        },
        {
          model: Status,
          as: "status",
          attributes: ["id", "code", "name"], //  only these columns
        },
      ],
    });

    console.log("FOUND USER:", user.toJSON());

    const newHash = await bcrypt.hash("123456", 12);
    console.log(newHash);

    if (!user) {
      await transaction.rollback();
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 3️⃣ Check password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      await transaction.rollback();
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 4️⃣ Check if user is active
    if (user.status.name !== StatusConstants.ACTIVE) {
      await transaction.rollback();
      return NextResponse.json(
        { error: "Account is not active" },
        { status: 403 },
      );
    }

    await transaction.commit();

    // 5️⃣ Set cookie (simple example session cookie)
    const response = NextResponse.json(
      {
        message: "Login successful",
        code: 200,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      },
      { status: 200 },
    );

    response.cookies.set("userId", user.id, {
      httpOnly: false, //if its true then logout api is need , cannot remove from the client side
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    response.cookies.set("role", user.role.code, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    await transaction.rollback();
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
