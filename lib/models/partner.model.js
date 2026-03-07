import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Partner = sequelize.define(
  "Partner",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },

    businessName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    businessEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    taxId: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    registrationNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "partners",
    timestamps: true,
    underscored: true,
  },
);
