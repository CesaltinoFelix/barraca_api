const Sequelize = require('sequelize');
const sequelize = new Sequelize(
{
    username: 'postgres',
    password: 'mfalsolution',
    database: 'barraca',
    host: 'localhost',
    dialect: 'postgres'
})


/*
const connection = new Sequelize('barraca','root','', {
    host: 'localhost',
    dialect: 'mysql'
}); 
*/

//module.exports = { sq: sequelize, testDbConnection };
module.exports = sequelize;