const Sequelize = require('sequelize');
const sequelize = new Sequelize('barraca','root','', {
    host: 'localhost',
    dialect: 'mysql'
}); 


/*
const connection = new Sequelize(
{
    username: 'postgres',
    password: 'mfalsolution',
    database: 'barraca',
    host: 'localhost',
    dialect: 'postgres'
})
*/

//module.exports = { sq: sequelize, testDbConnection };
module.exports = sequelize;