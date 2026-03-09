import { NextResponse } from "next/server";
import { Op } from "sequelize";
import { User, Role, Status } from "@/lib/models/index.js";
import { RoleConstants } from "@/constants/role.constants.js";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const role = searchParams.get("role") || RoleConstants.USER;
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const offset = (page - 1) * limit;

    const userWhere = {};

    // Search filter
    if (search) {
      userWhere[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { rows, count } = await User.findAndCountAll({
      where: userWhere,
      attributes: ["id", "name", "email", "createdAt"],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "name", "code"],
          where: { code: role },
          required: true,
        },
        {
          model: Status,
          as: "status",
          attributes: ["id", "name", "code"],
          ...(status && { where: { code: status } }),
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
    console.error("GET USERS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
