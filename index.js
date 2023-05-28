const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
const connection = require("./database/database"); 
const Products = require("./database/Products");
const users = require("./database/users");

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.static('public'));

//Conectando com o banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })


// Rotas da plataforma
app.get("/products",(req, res) => {
    Products.findAll({ raw: true, order:[
        ['id','DESC'] 
    ]}).then(products => {
           res.json(products);
    });
});



app.post("/product",(req, res) => {

    var name = req.body.name;
    var price = req.body.price;
    var description = req.body.description;
    var img = req.body.img;

    Products.create({
        name: name,
        price: price,
        description: description,
        img: img
    }).then((product) => {

        res.json(product)
    }); 
});

app.get("/Products/:id",(req ,res) => {
    var id = req.params.id;
    Products.findOne({
        where: {id: id}
    }).then(Products => {
        if(Products != undefined){ 

            res.json(Products);

        }else{ // Dados não encontrado
            res.redirect("/");
        }
    });
})




app.post('/upload-img', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "img") to retrieve the uploaded file
            let img = req.files.img;
            
            //Use the mv() method to place the file in the upload directory (i.e. "uploads")
            img.mv('./uploads/' + img.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: img.name,
                    mimetype: img.mimetype,
                    size: img.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});



app.listen(3000, '192.168.100.54','192.168.100.51','192.168.100.1',()=>{console.log("Rodando na porta 3000!");})