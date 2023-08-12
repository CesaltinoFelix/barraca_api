const express = require('express');
const { body, validationResult } = require('express-validator');

class salesValidator {
    static validateSalesData(req, res, next) {
      const { userId, productName, price,quantity,invoiceId,wallet } = req.body;
      if (!userId || !productName || !price || !quantity|| !invoiceId|| !wallet) {
        return res.status(400).json({ error: "Falatando campo obrigatorio" });
      }
 
      next();
    }

}
module.exports = salesValidator;