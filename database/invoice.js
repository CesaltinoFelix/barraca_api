const Sequelize = require("sequelize");
const connection = require("./database");

const invoice = connection.define('invoice',{
    ClientName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nif:{
        type: Sequelize.STRING,
        allowNull: false
    },
    invoiceNumber:{
        type: Sequelize.STRING,
        allowNull: false
    }

   
});

invoice.sync({force: false}).then(() => {});

module.exports = invoice;