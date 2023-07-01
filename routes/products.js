const express = require("express");
const Products = require("../database/products");
const router = express.Router();


router.get("/products-user/:id",(req, res) => {
    const id = req.params.id
    Products.findAll({ raw: true, order:[
        ['id','DESC']  
    ],  where: {userId: id} }).then(products => {
           res.json(products);
    }); 
});



router.post("/product/:id",(req, res) => {

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
router.put("/product-update/:id",(req, res) => {

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

router.get("/products/:id",(req ,res) => {
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

router.delete("/products/:id",(req ,res) => {
    var id = req.params.id;
    Products.destroy({
        where: {id: id}
    }).then((product) => {

        res.json(product)
    }); 
})



module.exports = router;