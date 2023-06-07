const express = require("express");
const costumer = require("../database/costumer");
const router = express.Router();


router.get("/costumers",(req, res) => {
    costumer.findAll({ raw: true, order:[
        ['id','DESC']  
    ]}).then(costumers => {
           res.json(costumers);
    }); 
});

 

router.post("/costumers",(req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var nif = req.body.nif;
    var contact = req.body.contact;

    costumer.create({
        name: name,
        nif: nif,
        email: email,
        contact: contact
    }).then((costumer) => {
        res.json(costumer)
    }); 
});





module.exports = router;