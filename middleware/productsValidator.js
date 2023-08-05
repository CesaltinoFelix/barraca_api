
const express = require('express');
const { body, validationResult } = require('express-validator');

class produtctsValidator {
    static validateProducts(req, res, next) {
      const { price,  name } = req.body;
      if (!price  || !name) {
        return res.status(400).json({ error: "Falatando campo obrigatorio" });
      }
    


      next();
    }

  
  }
  
  module.exports = produtctsValidator;
  