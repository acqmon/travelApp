import { sequelize } from "../db/sequelize.js";
import { User } from "./user.model.js";
import { Partner } from "./partner.model.js";
import { Role } from "./role.model.js";
import { Status } from "./status.model.js";
import { Package } from "./package.model.js";
import { Booking } from "./bookings.model.js"; // fixed naming to match your file

// --------------------------------------------------------------------------
//  User ↔ Role
// --------------------------------------------------------------------------
User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
Role.hasMany(User, { foreignKey: "role_id", as: "users" });

// --------------------------------------------------------------------------
//  User ↔ Status
// --------------------------------------------------------------------------
User.belongsTo(Status, { foreignKey: "status_id", as: "status" });
Status.hasMany(User, { foreignKey: "status_id", as: "users" });

// --------------------------------------------------------------------------
//  User ↔ Partner (1 : 1)
// --------------------------------------------------------------------------
User.hasOne(Partner, { foreignKey: "user_id", as: "partner" });
Partner.belongsTo(User, { foreignKey: "user_id", as: "user" });

// --------------------------------------------------------------------------
//  Partner ↔ Status
// --------------------------------------------------------------------------
Partner.belongsTo(Status, { foreignKey: "status_id", as: "status" });
Status.hasMany(Partner, { foreignKey: "status_id", as: "partners" });

// --------------------------------------------------------------------------
//  Partner ↔ Package (1 : N)
// --------------------------------------------------------------------------
Partner.hasMany(Package, { foreignKey: "partner_id", as: "packages" });
Package.belongsTo(Partner, { foreignKey: "partner_id", as: "partner" });

// --------------------------------------------------------------------------
//  Package ↔ Status
// --------------------------------------------------------------------------
Package.belongsTo(Status, { foreignKey: "status_id", as: "status" });
Status.hasMany(Package, { foreignKey: "status_id", as: "packages" });

// --------------------------------------------------------------------------
//  User ↔ Booking (1 : N)
// --------------------------------------------------------------------------
User.hasMany(Booking, { foreignKey: "user_id", as: "bookings" });
Booking.belongsTo(User, { foreignKey: "user_id", as: "user" });

// --------------------------------------------------------------------------
//  Package ↔ Booking (1 : N)
// --------------------------------------------------------------------------
Package.hasMany(Booking, { foreignKey: "package_id", as: "bookings" });
Booking.belongsTo(Package, { foreignKey: "package_id", as: "package" });

// --------------------------------------------------------------------------
//  Booking ↔ Status
// --------------------------------------------------------------------------
Booking.belongsTo(Status, { foreignKey: "status_id", as: "status" });
Status.hasMany(Booking, { foreignKey: "status_id", as: "bookings" });

// --------------------------------------------------------------------------
export { sequelize, User, Partner, Role, Status, Package, Booking };
