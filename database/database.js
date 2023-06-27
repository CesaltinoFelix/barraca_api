const Sequelize = require('sequelize');
const sequelize = new Sequelize(
{
    username: 'postgres',
    password: 'akualina',
    database: 'barraca',
    host: 'localhost',
    dialect: 'postgres'
})

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

/*
const connection = new Sequelize('barraca','root','', {
    host: 'localhost',
    dialect: 'mysql'
}); 
*/

//module.exports = { sq: sequelize, testDbConnection };
module.exports = sequelize;