const jwt = require('jsonwebtoken')
const SECRET ='trustMe'
class auth
{

    

    static async verifyToken(req,res,next)
    {
        const token =req.headers['x-acess-token'];
        jwt.verify(token,SECRET,(err,decoded)=>
        {
            if(err)
            {
                res.status(401).json({message:'Invalid Token'})
            }
            else
            {
                next();
            }
        })

    }




}
module.exports=auth;