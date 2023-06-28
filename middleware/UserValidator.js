// Middleware for validating request data
class UserValidator {
    static validateUserData(req, res, next) {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({ error: "Falatando campo obrigatorio" });
      }
      // Additional validation logic if needed
      next();
    }
  }
  
  module.exports = UserValidator;
  