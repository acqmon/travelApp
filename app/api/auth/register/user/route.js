import { NextResponse } from "next/server";
import { sequelize } from "../../../../../lib/db/sequelize.js";
import bcrypt from "bcryptjs";
import { User, Role, Status } from "../../../../../lib/models/index.js";
import { StatusConstants } from "../../../../../constants/api.constants.js";
import { RoleConstants } from "@/constants/role.constants.js";

export async function POST(req) {
  const transaction = await sequelize.transaction();

  try {
    const body = await req.json();
    const { name, email, password } = body;

    // 1️⃣ Validate input
    if (!name || !email || !password) {
      await transaction.rollback();
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      await transaction.rollback();
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    // 2️⃣ Check existing email
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      await transaction.rollback();
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    // 3️⃣ Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4️⃣ Get USER role
    const userRole = await Role.findOne({
      where: { name: RoleConstants.USER },
    });

    if (!userRole) {
      await transaction.rollback();
      return NextResponse.json(
        { error: "User role not configured in database" },
        { status: 500 },
      );
    }

    // 5️⃣ Get ACTIVE status
    const activeStatus = await Status.findOne({
      where: { name: StatusConstants.ACTIVE },
    });

    if (!activeStatus) {
      await transaction.rollback();
      return NextResponse.json(
        { error: "Default status not configured in database" },
        { status: 500 },
      );
    }

    // 6️⃣ Create user
    const newUser = await User.create(
      {
        name,
        email,
        passwordHash,
        roleId: userRole.id,
        statusId: activeStatus.id,
      },
      { transaction },
    );

    await transaction.commit();

    // 7️⃣ Safe response
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: {
            id: userRole.id,
            code: userRole.code,
            name: userRole.name,
            isActive: userRole.isActive,
          },
          status: {
            id: activeStatus.id,
            code: activeStatus.code,
            name: activeStatus.name,
            isActive: activeStatus.isActive,
          },
        },
      },
      { status: 201 },
    );
  } catch (error) {
    await transaction.rollback();
    console.error("REGISTER API ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// import { NextResponse } from "next/server";
// import { sequelize } from "../../../../../lib/db/sequelize.js";
// import bcrypt from "bcryptjs";
// import { User, Role, Status } from "../../../../../lib/models/index.js";
// import {
//   RoleConstants,
//   StatusConstants,
// } from "../../../../../constants/api.constants.js";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("REGISTER BODY:", body); //only in terminal it will log, not on browser

//     return NextResponse.json({
//       message: "User registered successfully",
//     });
//   } catch (error) {
//     console.error("REGISTER API ERROR:", error);

//     return NextResponse.json(
//       { error: "Invalid request or server error" },
//       { status: 500 },
//     );
//   }
// }
