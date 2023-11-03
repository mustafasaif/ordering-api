"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {}
  }

  Product.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.CHAR(100),
        allowNull: false,
        unique: true,
      },
      productName: {
        type: DataTypes.CHAR(150),
        allowNull: false,
      },
      productSize: {
        type: DataTypes.CHAR(100),
        allowNull: true,
      },
      productType: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
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
    { sequelize, modelName: "Product" }
  );
  return Product;
};
