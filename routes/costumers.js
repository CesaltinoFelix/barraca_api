const express = require("express");
const costumer = require("../database/costumer");
const router = express.Router();
const auth = require('../middleware/auth')

router.get("/costumers",auth.verifyToken,(req, res) => {
   
   try
   {
    costumer.findAll({ raw: true, order:[
        ['id','DESC']  
    ]}).then(costumers => {
           res.json(costumers);
    });
   }
   catch(error)
   {
        res.writeHead(500)
        
   }


    
});

router.get("/costumers/:id",auth.verifyToken,(req,res)=>
{
    const id = req.params.id
    costumer.findOne({raw:true,where:{id:id}}).then((response)=>
    {
        res.json(response)
    }).catch((error)=>
    {
        console.log(error)
    })
}) 

router.put("/costumers/:id",auth.verifyToken,(req,res)=>
{
    const id = req.params.id;
    const{name,nif,email,contact, adress} =req.body;
   
    costumer.update(
        {
            name: name,
            nif: nif,
            email: email,
            contact: contact,
            adress: adress,
        },{
            where:
            {
                id:id

            }
        
        }).then((costumer)=>
        {
            res.json(costumer)

        })
   
})

router.post("/costumers",(req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var nif = req.body.nif;
    var adress = req.body.adress;
    var contact = req.body.contact;

    costumer.create({
        name: name,
        nif: nif,
        email: email,
        adress: adress,
        contact: contact
    }).then((costumer) => {
        res.json(costumer)
    }); 
});

router.delete("/costumers/:id",auth.verifyToken,(req,res)=>
{

  var id = req.params.id
  
  costumer.destroy({
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