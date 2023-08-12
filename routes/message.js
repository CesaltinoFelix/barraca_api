const express = require("express");
const messageService = require("../services/messageService");
const  messageValidator = require('../middleware/messageValidator')
const router = express.Router();

const auth = require('../middleware/auth')

router.get("/message",auth.verifyToken,async (req, res) => {
    
         const post = await messageService.getAllMessage()
         post.code==200?res.status(200).json(post.data):res.status(500).json({error:post.data})
});

router.post("/message_data",auth.verifyToken,async(req,res)=>
{
         const data = req.body.data
         const post = await messageService.postMessageData(data)
         post.code==200?res.status(200).json(post.data):res.status(500).json({error:post.data})

})

router.get("/message/:id",auth.verifyToken,async(req,res)=>
{
    const id = req.params.id
    const get = await messageService.getMessageById(id)
    get.code==200?res.status(200).json(get.data):res.status(500).json({error:"Internal Server Error"})
    
}) 

router.put("/message/:id",auth.verifyToken,async(req,res)=>
{
    let data;
    const id = req.params.id;
    const{name,nif,email,contact}=data=req.body;
    const put = await messageService.putMessageById(data)
    get.code==200?res.status(200).json({message:"Updated"}):res.status(500).json({error:"Internal Server Error"})
})

router.post("/message",auth.verifyToken,messageValidator.validateMessage ,async(req, res) => {

    
    let data = req.body;
    const post = await messageService.postMessage(data)
    get.code==200?res.status(200).json({message:"Data Saved!"}):res.status(500).json({error:"Internal Server Error"})

});

router.delete("/message/:id",auth.verifyToken,async(req,res)=>
{

  var id = req.params.id
  const post = await messageService.deleteMessage(id)
  get.code==200?res.status(200).json({message:"Data deleted!"}):res.status(500).json({error:"Internal Server Error"})

})

module.exports = router;