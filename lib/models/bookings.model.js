import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Booking = sequelize.define(
  "Booking",
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
    packageId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "package_id",
    },
    bookingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "booking_date",
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "total_price",
    },
    statusId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "status_id",
    },
  },
  {
    tableName: "bookings",
    timestamps: true,
    underscored: true,
  },
);
