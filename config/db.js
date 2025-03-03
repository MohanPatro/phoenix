const { Sequelize } = require("sequelize");


// const sequelize = new Sequelize(process.env.DB_URL, {
//   dialect: "postgres",
// });


const sequelize = new Sequelize("mohan_db", "mohan", "mohan123", {
    host: "localhost",
    dialect: "postgres",
  });


module.exports = sequelize;
