import { NextResponse } from "next/server";
import { sequelize } from "../../../../../lib/db/sequelize.js";
import bcrypt from "bcryptjs";
import {
  User,
  Partner,
  Role,
  Status,
} from "../../../../../lib/models/index.js";
import { StatusConstants } from "../../../../../constants/api.constants.js";
import { RoleConstants } from "@/constants/role.constants.js";

export async function POST(req) {
  const transaction = await sequelize.transaction();

  try {
    const body = await req.json();

    const {
      name,
      email,
      password,
      companyName,
      phone,
      website,
      location,
      address,
      description,
    } = body;

    // 1️⃣ Validate input
    if (!name || !email || !password || !companyName) {
      await transaction.rollback();
      return NextResponse.json(
        { error: "Name, email, password and company name are required" },
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

    // 4️⃣ Get PARTNER role
    const partnerRole = await Role.findOne({
      where: { name: RoleConstants.PARTNER },
    });

    if (!partnerRole) {
      await transaction.rollback();
      return NextResponse.json(
        { error: "Partner role not configured in database" },
        { status: 500 },
      );
    }

    // 5️⃣ Get default status (PENDING recommended)
    const pendingStatus = await Status.findOne({
      where: { name: StatusConstants.ACTIVE },
    });

    if (!pendingStatus) {
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
        roleId: partnerRole.id,
        statusId: pendingStatus.id,
      },
      { transaction },
    );

    // 7️⃣ Create partner profile
    const partnerProfile = await Partner.create(
      {
        userId: newUser.id,
        companyName,
        phone,
        website,
        location,
        address,
        description,
        statusId: pendingStatus.id,
      },
      { transaction },
    );

    await transaction.commit();

    // 8️⃣ Response
    return NextResponse.json(
      {
        message: "Partner registered successfully",
        partner: {
          id: partnerProfile.id,
          companyName: partnerProfile.companyName,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          },
        },
      },
      { status: 201 },
    );
  } catch (error) {
    await transaction.rollback();

    console.error("PARTNER REGISTER ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
