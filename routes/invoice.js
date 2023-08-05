const express = require("express");
const invoice = require("../database/invoice");
const router = express.Router();
const auth = require('../middleware/auth')

router.get("/invoice-user/:id",auth.verifyToken,(req, res) => {
    const id = req.params.id
    invoice.findAll({ raw: true, order:[
        ['id','DESC']  
    ],  where: {id: id} }).then(invoice => {
           res.json(invoice);
    }); 
});



router.post("/invoice",auth.verifyToken,(req, res) => {

    const {clientName, nif, invoiceNumber,status, paymentStatus   } = req.body;
 
    invoice.create({
        clientName,
        nif,
        invoiceNumber,
        status, 
        paymentStatus 
    }).then((invoice) => {

        res.json(invoice)
    }); 
});
router.put("/invoice/:id",auth.verifyToken,(req, res) => {

    const {clientName, nif, invoiceNumber,status, paymentStatus   } = req.body;
 
    const id = req.params.id

     invoice.update({ 
        clientName,
        nif,
        invoiceNumber,
        status, 
        paymentStatus }, {
        where: {
          id: id
        }
      }).then((invoice) => {

        res.json(invoice)
    }); 

});

router.get("/invoice/:id",auth.verifyToken,(req ,res) => {
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

router.delete("/invoice/:id",auth.verifyToken,(req ,res) => {
    var id = req.params.id;
    invoice.destroy({
        where: {id: id}
    }).then((invoice) => {

        res.json(invoice)
    }); 
})



module.exports = router;