const Sequelize = require('sequelize');

const connection = new Sequelize('barraca','root','', {
    host: 'localhost',
    dialect: 'mysql'
}); 

module.exports = connection;