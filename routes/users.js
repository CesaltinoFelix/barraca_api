const express = require("express");
const users = require("../database/users");
const UserValidator = require("../middleware/UserValidator");
const bcrypt = require('bcrypt');
const router = express.Router();


// Route handler using async/await and data validation

router.get("/users", async (req, res) => {
  try {
    const user = await users.findAll({ raw: true, order: [["id", "DESC"]] });
    res.json({id:user.id,name:user.name,email:user.email,img:user.img,entityId:user.entityId,createdAt:user.createdAt});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    

    const user = await users.findOne({ where: { email } });
  // var data = JSON.stringify(user);
    //  console.log(data)
    

    const { email, password } = req.params;
    
    
    const user = await users.findOne({ where: { email, password } });

    if (user) {
   
      let senhaCriptografada = user.password
      const senhaCorrespondente = await bcrypt.compare(password, senhaCriptografada);
      if (senhaCorrespondente) {
        res.status(200).json({name:user.name,img:user.img,
          email:user.email,entityId:user.entityId,createdAt:user.createdAt});
      } else {
        res.status(401).json({ error: 'Credenciais inválidas.' });
      }

    } else {
      res.status(401).send("Credenciais inválidas.");
    }
  } catch (error) {
    //res.status(500).json({ error: "Internal Server Error" });
    res.status(500).json(error)
  }
});

router.post("/users", UserValidator.validateUserData, async (req, res) => {
  try {
    const { email, password, img = "", entityId, name } = req.body;
    
    const salt = await bcrypt.genSalt(10);
   
    const senha= await bcrypt.hash(password, salt);
    
    const newUser = await users.create({ name, email, password:senha, img, entityId });
   
    res.status(200).json({name:`${newUser.name}`,email:`${newUser.email}`,
    img:`${newUser.img}`,entityId:`${newUser.entityId}`,
    createdAt:`${newUser.createdAt}`});

  } catch (error) {
    res.status(500).json({error:"Internal Server Error!"});
  }
});

router.put("/login",async (req,res)=>
{

 
 try {

  const {email,password}=req.body;
  
  const user = await users.findOne({where:{email}})
 // console.log(user)
  if(user)
  {
    const salt = await bcrypt.genSalt(10);
    const senha= await bcrypt.hash(password, salt);

    const data = await users.update({password:senha},{where: {email:email}}).then(data=>
      {
        res.status(200).json({message:"Data updated!"})
      })
    
  }
  else
  {
    res.status(401).json({message:"Crendencias Inválidas."})
  }

  
 } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
 }


})


router.get("/users/:id", async (req, res) => {
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
