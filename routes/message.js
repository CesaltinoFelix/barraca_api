const express = require("express");
const message = require("../database/message");
const router = express.Router();
const { Op, Sequelize } = require('sequelize');

router.get("/message",(req, res) => {
    message.findAll({ raw: true, order:[
        ['id','DESC']  
    ]}).then(message => {
           res.json(message);
    }); 
});

router.post("/message_data",(req,res)=>
{
        const data = req.body.data
    message.findAll(
        {
            where:
            {
            createdAt:
            {
                [Op.eq]: new Date(data)
            }
            
            },
            raw:true
        }).then((response)=>
        {
            res.json(response)
        
        }).catch((error)=>
        {
            res.json(error)
        })


})

router.get("/message/:id",(req,res)=>
{
    const id = req.params.id
    message.findOne({raw:true,where:{id:id}}).then((response)=>
    {
        res.json(response)
    }).catch((error)=>
    {
        console.log(error)
    })
}) 

router.put("/message/:id",(req,res)=>
{
    const id = req.params.id;
    const{name,nif,email,contact} =req.body;
   
    message.update(
        {
            name: name,
            nif: nif,
            email: email,
            contact: contact
        },{
            where:
            {
                id:id

            }
        
        }).then((message)=>
        {
            res.json(message)

        })
   
})

router.post("/message",(req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var mensagem = req.body.message;


    message.create({
        name: name,
        email: email,
        message: mensagem
        
    }).then((message) => {
        res.json(message)
    }); 
});

router.delete("/message/:id",(req,res)=>
{

  var id = req.params.id
  
  message.destroy({
    where :{id:id}
  }).then((response)=>
  {
    res.json(response)
  }).catch((error)=>
  {
    console.log(error)
  })



})
,




module.exports = router;