const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const List = sequelize.define(
  "list",
  {
    listID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    listUserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);

module.exports = List;
