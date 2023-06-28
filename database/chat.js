const Sequelize = require("sequelize");
const connection = require("./database");

const Chat = connection.define("chats", {
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Chat.sync({ force: false }).then(() => {});

module.exports = Chat;
