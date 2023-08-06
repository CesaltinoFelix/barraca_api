const { Op, Sequelize } = require('sequelize');
const message = require("../database/message");
const xss = require ("xss")
class messageService
{

    static async getAllMessage()
    {
        try {
            
              const get = await findAll({ raw: true, order:[
                ['id','DESC']  
            ]})  
              return {code:200,data:get}



        } catch (error) {
            
            return {code:500}
        }
       

    }

    static async postMessageData(data)
    {
        try {
            
              const post = await message.findAll(
                {
                    where:
                    {
                    createdAt:
                    {
                        [Op.eq]: new Date(data)
                    }
                    
                    },
                    raw:true
                })
    
                return {code:200,data:post}


        } catch (error) {
            
            return {code:500}
        }
       

    }

    static async getMessageById(id)
    {
        try {
            
              const get = await message.findOne({raw:true,where:{id:id}})   
              return {code:200,data:get}



        } catch (error) {
            
            return {code:500}
        }
       

    }

    static async putMessageById(data,id)
    {
        try {
            
              const get = await message.update(
                {
                    name:xss(data.name) ,
                    nif: xss(nif),
                    email: xss(data.email),
                    contact:xss(data.contact)
                },{
                    where:
                    {
                        id:id
        
                    }
                
                })



              return {code:200,data:get}
              


        } catch (error) {
            
            return {code:500}
        }
       

    }

    static async postMessage(data)
    {
        try {
            
              const post = await message.create({
                name: xss(data.nome),
                email: xss(data.email),
                message: xss(data.mensagem)
                
            })
    
                return {code:200,data:post}


        } catch (error) {
            
            return {code:500}
        }
       

    }

    static async deleteMessage(id)
    {
        try {
            
              const post = await message. message.destroy({
                where :{id:id}
              })
    
            return {code:200,data:post}


        } catch (error) {
            
            return {code:500}
        }
       

    }

}
module.exports=messageService;