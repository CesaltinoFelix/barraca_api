const express = require("express");
const Products = require("../database/products");
const router = express.Router();
const auth = require('../middleware/auth')
const productsService = require('../services/productsService')
const productsValidator = require('../middleware/productsValidator')
router.get("/products-user/:id",auth.verifyToken,async(req, res) => {

  const id = req.params.id
    
  const getProductById = await productsService.getProductUserById(id)
  
  getProductById.code==200?res.status(200).json(getProductById.data):res.status(500).json({error:getProductById.message})
   
});



router.post("/product/:id",auth.verifyToken,productsValidator.validateProducts,async (req, res) => {

    let data;
    const {name, price, description = '',barcode = ''} = data = req.body;
    const img =   'product-box.jpg'
    console.log(req.body);
    const id = req.params.id
    const insertProduct = await productsService.CreateProduct(data,id,img)
    insertProduct.code==200?res.status(200).json(insertProduct.data):res.status(500).json({error:insertProduct.message})
 
})

router.put("/product-update/:id",auth.verifyToken,productsValidator.validateProducts,async(req, res) => {

   
    const {name, price, description = '', barcode =''  } = req.body;
    const id = req.params.id
    const updateProduct = await productsService.productUpdate(data,id);
    updateProduct.code==200?res.status(200).json({message:updateProduct.message}):res.status(500).json({error:updateProduct.error})
  

});

router.get("/products/:id",auth.verifyToken,async(req ,res) => {
    var id = req.params.id;
    
    const getProduct = await productsService.getProductById(id)
    
    if(getProduct.code==200)
    {
        res.status(200).json(getProduct.data)
    }
    else if (getProduct.code==404)
    {
        res.redirect("/");
    }
    else
    {
        res.status(500).json({error:"Internal Server Error"})

    }
})

router.delete("/products/:id",auth.verifyToken,async(req ,res) => {
    
    var id = req.params.id;
    const del =await productsService.deleteProduct(id)   
    del.code=200?res.status(200).json({message:"produto eliminado!"}):res.status(500).json({error:"Internal server error"})
   
})



module.exports = router;