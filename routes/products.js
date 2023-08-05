const express = require("express");
const Products = require("../database/products");
const router = express.Router();
const auth = require('../middleware/auth')

router.get("/products-user/:id",auth.verifyToken,(req, res) => {
    const id = req.params.id
    Products.findAll({ raw: true, order:[
        ['id','DESC']  
    ],  where: {userId: id} }).then(products => {
           res.json(products);
    }); 
});



router.post("/product/:id",auth.verifyToken,(req, res) => {

    const {name, price, description = '',barcode = ''} = req.body;
    const img =   'product-box.jpg'
    console.log(req.body);
    const id = req.params.id
 
    Products.create({
        userId: id,
        name: name,
        barcode: barcode,
        price: price,
        description: description,
        img: img
       
    }).then((product) => {

        res.json(product)
    }); 
});
router.put("/product-update/:id",auth.verifyToken,(req, res) => {

    const {name, price, description = '', barcode =''  } = req.body;
    const id = req.params.id

     Products.update({ 
        name: name,
        price: price,
        description: description,
        barcode: barcode
    }, {
        where: {
          id: id
        }
      }).then((product) => {

        res.json(product)
    }); 

});

router.get("/products/:id",auth.verifyToken,(req ,res) => {
    var id = req.params.id;
    Products.findOne({
        where: {id: id}
    }).then(Products => {
        if(Products != undefined){ 

            res.json(Products);

        }else{ // Dados não encontrado
            res.redirect("/");
        }
    });
})

router.delete("/products/:id",auth.verifyToken,(req ,res) => {
    var id = req.params.id;
    Products.destroy({
        where: {id: id}
    }).then((product) => {

        res.json(product)
    }); 
})



module.exports = router;