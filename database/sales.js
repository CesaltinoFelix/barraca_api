const Sequelize = require("sequelize");
const connection = require("./database");

const sales = connection.define('sales',{
    userId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    productName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    img:{
        type: Sequelize.STRING,
        allowNull: false
    },
    
});

sales.sync({force: false}).then(() => {});

module.exports = sales;