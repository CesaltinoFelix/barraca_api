const express = require("express");
const sales = require("../database/sales");
const printer = require("./pdf_printer");
const router = express.Router();


router.post("/sales", (req, res) => {
    const { name, price, quantity, img, userId , description } = req.body

    sales.create({
        userId: userId,
        productName: name,
        price: price,
        quantity: quantity,
        description: description,
        img: img
    }).then((sale)=>{
        const minhaImpressora = new printer();
        const faturaExemplo = {
            numero: '2023001',
            data: '09/06/2023',
            itens: [
              { descricao: 'Produto 1', quantidade: 2, precoUnitario: 10.50, total: 21 },
              { descricao: 'Produto 2', quantidade: 1, precoUnitario: 15.75, total: 15.75 },
              { descricao: 'Produto 3', quantidade: 3, precoUnitario: 8.90, total: 26.70 }
            ],
            total: 63.45
          };
          console.log('passou aqui')
          minhaImpressora.gerarFatura(faturaExemplo);
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