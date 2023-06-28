const express = require("express");
const Chat = require("../database/chat");
const router = express.Router();
const { Op } = require('sequelize');
// Rota para obter todas as mensagens de chat
router.get("/chat/:senderId", async (req, res) => {
    try {
      const { senderId } = req.params;
      const chatMessages = await Chat.findAll({ 
        raw: true, 
        where: { 
          [Op.or]: [
            { senderId: senderId },
            { receiverId: senderId }
          ]
        } 
      });
      res.json(chatMessages);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// Rota para criar uma nova mensagem de chat
router.post("/chat", async (req, res) => {
  console.log(req.body)
try {
    const { senderId, message } = req.body;
    const receiverId = 0;
    const newChatMessage = await Chat.create({ senderId, message, receiverId });
    res.json(newChatMessage);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  } 
});

// Rota para excluir uma mensagem de chat pelo ID
router.delete("/chat/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedChatMessage = await Chat.destroy({ where: { id } });
      res.json(deletedChatMessage);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
