

class messageValidator {
    static validateMessage(req, res, next) {
      const { email,  name,message } = req.body;
      if (!email  || !name || !message) {
        return res.status(400).json({ error: "Falatando campo obrigatorio" });
      }
    


      next();
    }

  
  }
  
  module.exports = messageValidator;
  