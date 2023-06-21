const express = require("express");
const invoice = require("../database/invoice");
const router = express.Router();


router.get("/invoice-user/:id",(req, res) => {
    const id = req.params.id
    invoice.findAll({ raw: true, order:[
        ['id','DESC']  
    ],  where: {id: id} }).then(invoice => {
           res.json(invoice);
    }); 
});



router.post("/invoice",(req, res) => {

    const {clientName, nif, nFatura   } = req.body;
 
    invoice.create({
        ClientName: clientName,
        nif: nif,
        nFatura:nFatura
    }).then((invoice) => {

        res.json(invoice)
    }); 
});
router.put("/invoice/:id",(req, res) => {

    const {clientName, nif} = req.body;
    const id = req.params.id

     invoice.update({ name: name,
        ClientName: clientName,
        nif: nif,}, {
        where: {
          id: id
        }
      }).then((invoice) => {

        res.json(invoice)
    }); 

});

router.get("/invoice/:id",(req ,res) => {
    var id = req.params.id;
    invoice.findOne({
        where: {id: id}
    }).then(invoice => {
        if(invoice != undefined){ 

            res.json(invoice);

        }else{ // Dados não encontrado
            res.redirect("/");
        }
    });
})

router.delete("/invoice/:id",(req ,res) => {
    var id = req.params.id;
    invoice.destroy({
        where: {id: id}
    }).then((invoice) => {

        res.json(invoice)
    }); 
})



module.exports = router;