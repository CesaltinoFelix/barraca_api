const express = require("express");
const Products = require("../database/products");
const router = express.Router();


router.get("/products",(req, res) => {
    Products.findAll({ raw: true, order:[
        ['id','DESC']  
    ]}).then(products => {
           res.json(products);
    }); 
});



router.post("/product",(req, res) => {

    var name = req.body.name;
    var price = req.body.price;
    var description = req.body.description;
    var img = req.body.img;
 
    Products.create({
        name: name,
        price: price,
        description: description,
        img: img
    }).then((product) => {

        res.json(product)
    }); 
});

router.get("/Products/:id",(req ,res) => {
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

router.delete("/Products/:id",(req ,res) => {
    var id = req.params.id;
    Products.destroy({
        where: {id: id}
    }).then((product) => {

        res.json(product)
    }); 
})



module.exports = router;