const express = require("express");
const users = require("../database/users");
const router = express.Router();


router.get("/users",(req, res) => {
    users.findAll({ raw: true, order:[
        ['id','DESC']  
    ]}).then(users => {
           res.json(users);
    }); 
});


router.get("/login/:email/:password",(req, res) => {
    var email = req.params.email;
    var password = req.params.password;
    users.findOne({
        where: {email: email, password: password}
    }).then(users => {
        if(users != undefined){ 

            res.json(users);
        }else{ // Dados não encontrado
            res.status(401).send('Credenciais inválidas');
        }
    }); 
});

router.post("/users",(req, res) => {

    console.log(req.body)
    var email = req.body.email;
    var password = req.body.password;
    var img = req.body.img ? req.body.img : '' ;
    var entityId = req.body.entityId;
    var name = req.body.name;
   
    users.create({
        name: name,
        email: email,
        password: password,
        img: img,
        entityId: entityId,
    }).then((user) => {

        res.json(user)
    }); 
});

router.get("/users/:id",(req ,res) => {
    var id = req.params.id;
    users.findOne({
        where: {id: id}
    }).then(users => {
        if(users != undefined){ 

            res.json(users);

        }else{ // Dados não encontrado
            res.redirect("/");
        }
    });
})

router.delete("/users/:id",(req ,res) => {
    var id = req.params.id;
    users.destroy({
        where: {id: id}
    }).then((user) => {

        res.json(user)
    }); 
})



module.exports = router;