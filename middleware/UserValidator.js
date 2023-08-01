// Middleware for validating request data
const express = require('express');
const { body, validationResult } = require('express-validator');

class UserValidator {
    static validateUserData(req, res, next) {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({ error: "Falatando campo obrigatorio" });
      }

    
     
      //return res.status(400).json({error:"Os campos não podem estar vazios!"})
     
     


      next();
    }
 /*
    static validateEmptyCamp(req,res,next)
    {
      const validateData = [
       
        body('name').notEmpty().withMessage('o campo "name" não pode estar vazio'),
        body('password').notEmpty().withMessage('o campo "password" não pode estar vazio') ,
        body('email').notEmpty().withMessage('o campo "email" não pode estar vazio'),
        // Outras validações podem ser adicionadas para os demais campos
      
        // Middleware para tratar os erros de validação
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }
          next();
        },
      ];
    }
*/
  
  }
  
  module.exports = UserValidator;
  