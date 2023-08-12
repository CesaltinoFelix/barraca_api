const Products = require("../database/products");
const xss = require('xss')
class productsValidator
{

  static async  getProductUserById(id)
    {
        try {
           
            const rows = Products.findAll({ raw: true, order:[
                ['id','DESC']  
            ],  where: {userId: id} }).then(products => {
                  return products;
            }); 
    
            return {code:200,data:rows}
       
        } catch (error) {
            return {code:500,message:"Internal Error Server"}
        }
   
    }

    static async  CreateProduct(data,id,img)
    {
        try {
           
  const insertProduct = await Products.create({
        userId:id,
        name: xss(data.name),
        barcode: data.barcode,
        price: xss(data.price),
        description: data.description,
        img:img
       
    }).then((product) => {

      return  product
    }); 
           
       return {code:200,data:insertProduct}
       
        } catch (error) {
            return {code:500,message:"Internal Error Server"}
        }
   
    }
    

    static async productUpdate(data,id)
    {

            try {
                const updateProduct = await Products.update({ 
                    name: xss(data.name),
                    price: xss(data.price),
                    description: data.description,
                    barcode: data.barcode
                }, {
                    where: {
                      id: id
                    }
                  }).then((product) => {
            
                   return product
                });

                return {code:200,message:"data updated"}
          
            } catch (error) {
            
                return {code:500,error:"Internal server error"}
          
            }

       
    }

    static async getProductById(id)
    {
        try {
            
            const getProduct = await Products.findOne({
                where: {id: id}
            }).then(Products => {
                if(Products != undefined){ 
        
                    return Products;
        
                }else{ // Dados não encontrado
                   return null
                }
            });
            
            if(getProduct !=null)
            {
                return {code:200,data:getProduct}
            }
            else
            {
                return {code:404}
            }

        } catch (error) {
            return {code:500}
        }
    }

    static async deleteProduct(id)
    {
        try {
            
            const del = await  Products.destroy({
                where: {id: id}
            }).then((product) => {
        
                return product

            }); 

            return {code:200}

        } catch (error) {
          
            return {code:500}
            
        }
    }


}

module.exports=productsValidator;