const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Task = sequelize.define(
  "task",
  {
    taskID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    listID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    priority: {
      type: DataTypes.STRING,
    },
    userID: {
      type: DataTypes.STRING,
    },
  },
  {}
);

module.exports = Task;
