"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
      User.belongsTo(models.Branch, {
        // as: "branch",
        // foreignKey: "branchId",
      });
      User.hasMany(models.CartItem);
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordUpdatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM(["user", "sales", "admin", "branch_manager"]),
        allowNull: false,
        defaultValue: "user",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      branchId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  // Define the defaultScope
  User.addScope("defaultScope", {
    attributes: { exclude: ["password"] },
  });

  // Define the withPassword scope
  User.addScope("withPassword", {});

  return User;
};
