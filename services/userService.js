const users = require("../database/users");
const bcrypt = require('bcrypt');
const authService = require("../services/authService");
const xss = require('xss')
 class userService
{

  static async createUser(data)
   {

    try {
     
        const salt = await bcrypt.genSalt(10);
   
        const senha= await bcrypt.hash(xss(data.password), salt);
        
        const newUser = await users.create({ name:xss(data.name), email:xss(data.email), password:senha, img:data.img ?? '', entityId:data.entityId });
        const token = await authService.generateToken(data.email) 
      
        return {code:200,token};
        
    } catch (error) {
        
        return {message:"Internal Server Error"};

    }

   }

   static async update(data)
   {

    try {

        const user = await users.findOne({where:{email:xss(data.email)}})
        const salt = await bcrypt.genSalt(10);
        const senha= await bcrypt.hash(xss(data.password), salt);
        const datas = await users.update({password:senha},{where: {email:xss(data.email)}})
        return 200;
    
    } catch (error) {
        return "Crendencias Inválidas.";
    }
   
   }

   static async delete(id)
   {
    try {
        
        const user = await users.findOne({where:{id:xss(id)}})
        if(user)
        {
        const deletedUser = await users.destroy({ where: { id:xss(id) } });
         return 200
        }
        else
        {
            return 404
        }

    } catch (error) {
        return 500
    }
   }

 static async  postLogin(email, password )
 {
    try {
        var dataReturned;
        const user = await users.findOne({ where: { email:xss(email)} });
        
       
        if (user !=null) {
          let senhaCriptografada = user.password
         
          const senhaCorrespondente = await bcrypt.compare(password, senhaCriptografada);
          if (senhaCorrespondente) {
          console.log('celson');

            const token = await authService.generateToken(user.email) 
           

              dataReturned={"code":200,
              "data":
                { name:user.name,
                    img:user.img ?? '',
                email:user.email,
                entityId:user.entityId,
                createdAt:user.createdAt,
                token
               }}
             

                return dataReturned;

          } else {
           
            dataReturned=[{"code":401,"message":'Credenciais inválidas.'}]
            return dataReturned
          }
    
        } else if(user==null) {
           
            dataReturned={"code":404,"message":'Credenciais inválidas.'}
            return dataReturned
        }
        else
        {
          return {code:500,message:"Internal Server Error"}
        }
      } catch (error) {
        dataReturned={"code":500,"message":`Internal Server Error`}
        return dataReturned
       
       
      }
 }

 static async getAllUser()
 {
    
    try {
         var returnedData;
        const user = await users.findAll( { attributes: ['name', 'email','img','entityId','createdAt','updatedAt'],raw: true, order: [["id", "DESC"]] });
      
         returnedData={"code":200,"data":user}
         
              
         
 
         return returnedData
    } catch (error) {
       
        returnedData ={"code":500,"message":"Internal Server Error"}
        return returnedData
    }

 }


}
module.exports = userService;
