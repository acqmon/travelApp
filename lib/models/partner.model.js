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
      field: "user_id",
    },

    companyName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "company_name",
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    statusId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "status_id",
    },
  },
  {
    tableName: "partners",
    timestamps: true,
    underscored: true,
  },
);
