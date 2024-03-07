const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("todo-app-db", "root", "pastelfire882", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
