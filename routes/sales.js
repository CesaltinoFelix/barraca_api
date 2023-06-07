const express = require("express");
const sales = require("../database/sales");
const router = express.Router();


router.post("sales", (req, res) => {
    const { name, price, quantity, img, userId, description } = req.body

    sales.create({
        userId: '1',
        productName: name,
        price: price,
        quantity: quantity,
        description: description,
        img: img
    }).then((sale)=>{
        res.json(sale);
    })
}) 


module.exports = router;