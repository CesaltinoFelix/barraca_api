const express = require("express");
const sales = require("../database/sales");
const router = express.Router();


router.post("/sales", (req, res) => {
    const { name, price, quantity, img, userId = 1, description } = req.body

    sales.create({
        userId: userId,
        productName: name,
        price: price,
        quantity: quantity,
        description: description,
        img: img
    }).then((sale)=>{
        res.json(sale);
    })
}) 

router.get("/sales",(req, res) => {
    sales.findAll({ raw: true, order:[
        ['id','DESC']  
    ]}).then(sales => {
           res.json(sales);
    }); 
});


module.exports = router;