const Sequelize = require("sequelize");
const connection = require("./database");

const Products = connection.define('product',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    img:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Products.sync({force: false}).then(() => {});

module.exports = Products;