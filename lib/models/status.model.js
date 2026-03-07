import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Status = sequelize.define(
  "Status",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "statuses",
    timestamps: true,
    underscored: true,
  },
);
