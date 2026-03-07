import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password_hash",
    },

    emailVerifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "email_verified_at",
    },

    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "last_login_at",
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "role_id",
    },

    statusId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "status_id",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
    indexes: [{ unique: true, fields: ["email"] }],
  },
);
