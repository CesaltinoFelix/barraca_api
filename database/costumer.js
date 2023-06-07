const Sequelize = require("sequelize");
const connection = require("./database");

const costumer = connection.define('costumers',{

    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nif:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    contact:{
        type: Sequelize.STRING,
        allowNull: false
    },
    
});

costumer.sync({force: false}).then(() => {});

module.exports = costumer;