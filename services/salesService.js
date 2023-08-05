const xss = require('xss')
const printer = require("./pdf_printer");
const sales = require("../database/sales");

class salesService
{

    static async postSale(data)
    {

            try {
                //teste
             
               const post =  await  sales.create({
                    userId:data.userId , 
                    invoiceId:data.invoiceId,
                    productName:`${xss(data.productName)}`  ,
                    price:`${xss(data.price)}`  ,
                    quantity:data.quantity  ,
                    description:`${xss(data.description)}`  ,
                    img:`${data.img}`,
                    wallet:`${data.wallet}` 
                })
                return {code:200,message:"dados salvos!"};
                

            } catch (error) {
                return {code:500,message:`Internal Server Error`}
            }

          
    }


}
module.exports=salesService;