const express = require("express");
const sales = require("../database/sales");
const printer = require("./pdf_printer");
const router = express.Router();
const auth = require('../middleware/auth')
const salesValidator = require('../middleware/salesValidator')
const salesService = require('../services/salesService')
router.post("/sales",auth.verifyToken,salesValidator.validateSalesData ,async (req, res) => {
   
    let data;
    const { name, price, quantity, img, userId , description, invoiceId = 1,wallet } = data = req.body
    const sale = await salesService.postSale(data) 
    sale.code==200?res.status(200).json({message:sale.message}):res.status(500).json({Error:sale.message})
}) 

router.post("/sale-invoice/:codigoFatura",auth.verifyToken, async (req, res) => {
    sales.findAll({
       
    }).then((sale)=>{
       const dadosVenda = req.body.data
       const codigoFatura = req.params.codigoFatura
        const minhaImpressora = new printer();
  const dataFatura = _dataAtual();
        const dadosFatura = {
            numero: '2023001',
            data: dataFatura,
            itens: 
                dadosVenda,
            total: dadosVenda.reduce((total, item) => total + item.total, 0)
          };
          
          minhaImpressora.gerarFatura(dadosFatura, codigoFatura);
          const outputFilename = `./uploads/fatura_${codigoFatura}.pdf`;
        res.json(outputFilename);
    })
}) 

router.get("/sales",auth.verifyToken,(req, res) => {
    sales.findAll({ raw: true, order:[
        ['id','DESC']  
    ]}).then(sales => {
           res.json(sales);
    }); 
});

function _dataAtual() {
    const dataAtual = new Date();

    // Obtendo os valores do dia, mês e ano
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1; // Os meses são indexados a partir de 0, por isso é adicionado 1
    const ano = dataAtual.getFullYear();

    // Formatando a data no formato dd/mm/aaaa
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;

    return dataFormatada; // Retornar a data formatada
}






module.exports = router;

