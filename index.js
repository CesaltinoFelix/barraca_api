const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database"); 
const Products = require("./database/Products");
//Conectando com o banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//Usando o EJS como View engine
app.use(express.static('public'));
// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas da plataforma
app.get("/products",(req, res) => {
    console.log('passou')
    Products.findAll({ raw: true, order:[
        ['id','DESC'] 
    ]}).then(products => {
        
           res.json(products);
        
    });
});



app.post("/product",(req, res) => {
console.log(req)
    var name = req.body.name;
    var price = req.body.price;
    var description = req.body.description;
    var img = req.body.img;

    Products.create({
        name: name,
        price: price,
        description: description,
        img: img
    }).then(() => {
        res.send("sucesso");
    }); 
});

app.get("/Products/:id",(req ,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ 

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[ 
                    ['id','DESC'] 
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        }else{ // Dados não encontrado
            res.redirect("/");
        }
    });
})

app.post("/responder",(req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(3000, '192.168.100.58','192.168.100.51','192.168.100.1',()=>{console.log("Rodando na porta 3000!");})