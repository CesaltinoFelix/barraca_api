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

Products.sync({force: false}).then(() => {
/* Products.create({ name: 'bread', price: '2222', img: '-1106222213790872442.jpg', description: 'the best nike in the world' });
Products.create({ name: 'Nike', price: '222', img: 'IMG-20230525-WA0009.jpg', description: 'the best nike in the world' });
Products.create({ name: 'bread', price: '2222', img: '-1106222213790872442.jpg', description: 'the best nike in the world' });
Products.create({ name: 'Nike', price: '222', img: 'IMG-20230525-WA0009.jpg', description: 'the best nike in the world' }); */
});

module.exports = Products;