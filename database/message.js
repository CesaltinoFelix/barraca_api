const Sequelize = require("sequelize");
const connection = require("./database");

const message = connection.define('message',{

    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
   
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    message:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

message.sync({force: false}).then(() => {});

module.exports = message;