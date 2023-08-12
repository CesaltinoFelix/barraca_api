const express = require("express");
const users = require("../database/users");
const UserValidator = require("../middleware/UserValidator");
const auth = require('../middleware/auth')
const bcrypt = require('bcrypt');
const router = express.Router();
const userService = require("../services/userService");
const xss = require('xss')
// Route handler using async/await and data validation

router.get("/users",auth.verifyToken,async (req, res) => {
 
    const user =await userService.getAllUser();
    user.code == 200 ? res.status(user.code).json(user.data) : res.json(user.code).json(user.message)

});

router.post("/login", async (req, res) => {
 

    const { email, password } = req.body;
    console.log(xss(email))
    const login =await userService.postLogin(xss(email),xss(password) )

      
      if(login.code==200)
      {
        res.status(login.code).json(login.data);
      }
      
      else if(login.code==404)
      {
        res.status(login.code).json({message:login.message});
      }
      else if(login.code==500)
      {
        res.status(login.code).json({message:login.message})
      }
     
      

});

router.post("/users",  async (req, res) => {
 

   let data;
   const { email, password, img = "", entityId, name } = data = req.body ;
   const user = await userService.createUser(data);
   const token= user.token
   user.code==200? res.status(200).json({email,img,entityId,name,token}):res.status(500).json({error:user})


});

router.put("/login",auth.verifyToken,async (req,res)=>
{

  let data;
  const {email,password}= data =req.body;
  const user = await userService.update(data);
  user==200? res.status(200).json({message:"Data updated!"}):res.status(401).json({message:user})

})


router.get("/users/:id",auth.verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({ where: { id } });
    if (user) {
      res.json({id:user.id,name:user.name,email:user.email,img:user.img,entityId:user.entityId,createdAt:user.createdAt});
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/users/:id",auth.verifyToken, async (req, res) => {

    const { id } = req.params;
    const user = await userService.delete(id)
    if(user==200)
    res.status(200).json({message:"Registro eliminado!"});
    else if(user==500)
    res.status(500).json({message:"Internal Server Error!"})
    else
    res.status(404).json({message:"Utilizador não encontrado!"})
    
    
  
});

module.exports = router;
