import { sequelize, User, Role, Status } from "../models/index.js";
import bcrypt from "bcryptjs";

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // safer than force
    console.log("✅ Database synced successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error syncing database:", error);
    process.exit(1);
  }
}

// Run the sync
syncDatabase();
