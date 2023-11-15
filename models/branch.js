"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    static associate(models) {
      //Define associations here
      Branch.hasMany(models.User, {
        // as: "users",
        // foreignKey: "branchId",
        sourceKey: "branchId",
      });
    }
  }

  Branch.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      branchId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      branchName: { type: DataTypes.STRING, allowNull: false },
      branchLocation: { type: DataTypes.STRING, allowNull: false },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },

    {
      sequelize,
      modelName: "Branch",
    }
  );
  return Branch;
};
