const jwt = require('jsonwebtoken')
const SECRET ='trustMe'
class authService 
{

    static generateToken(email)
    {
       const token = jwt.sign({email},SECRET,{expiresIn:900});
       return token;
    }



}
module.exports=authService;