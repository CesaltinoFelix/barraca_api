const Sequelize = require("sequelize");
const connection = require("./database");

const users = connection.define('users',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{ 
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    img:{
        type: Sequelize.STRING,
        allowNull: false
    },
    entityId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

users.sync({force: false}).then(() => {});

module.exports = users;