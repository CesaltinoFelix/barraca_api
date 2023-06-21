const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");


router.post('/email',(req,res)=>
{
     const {message,destinatario,assunto}=req.body
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'reginaldoangolares@gmail.com',
          pass: 'Reginaldo_1914'
        }
      });
      const mailOptions = {
        from: 'reginaldoangolares@gmail.com',
        to: `${destinatario}`,
        subject: `${assunto}`,
        text: `${message}`
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });

})


module.exports = router;