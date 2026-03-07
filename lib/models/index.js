import { sequelize } from "../db/sequelize.js";
import { User } from "./user.model.js";
import { Partner } from "./partner.model.js";
import { Role } from "./role.model.js";
import { Status } from "./status.model.js";

// --------------------------------------------------------------------------
//  Associations
// --------------------------------------------------------------------------

// A User belongs to one Role
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(User, { foreignKey: "roleId", as: "users" });

// A User belongs to one Status
User.belongsTo(Status, { foreignKey: "statusId", as: "status" });
Status.hasMany(User, { foreignKey: "statusId", as: "users" });

User.hasOne(Partner, { foreignKey: "userId", as: "partner" });
Partner.belongsTo(User, { foreignKey: "userId", as: "user" });

export { sequelize, User, Role, Status };
