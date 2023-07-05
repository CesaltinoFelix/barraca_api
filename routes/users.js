const express = require("express");
const users = require("../database/users");
const UserValidator = require("../middleware/UserValidator");
const router = express.Router();


// Route handler using async/await and data validation
router.get("/users", async (req, res) => {
  try {
    const usersList = await users.findAll({ raw: true, order: [["id", "DESC"]] });
    res.json(usersList);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/login/:email/:password", async (req, res) => {
  try {
    const { email, password } = req.params;
    console.log(email , password)
    const user = await users.findOne({ where: { email, password } });
    if (user) {
      res.json(user);
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/users", UserValidator.validateUserData, async (req, res) => {
  try {
    const { email, password, img = "", entityId, name } = req.body;
    const newUser = await users.create({ name, email, password, img, entityId });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({ where: { id } });
    if (user) {
      res.json(user);
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await users.destroy({ where: { id } });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
