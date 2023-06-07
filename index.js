const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
const connection = require("./database/database"); 
const users = require("./database/users");
const sales = require("./database/sales");

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static('uploads'));

 //arquivos rotas
const  products = require("./routes/products");
const  uploads = require("./routes/uploads");
const costumers = require("./routes/costumers");
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
app.use("/", products)
app.use("/", uploads)
app.use("/", costumers)





app.listen(3000, '192.168.100.51','192.168.100.51','192.168.100.1',
()=>{
    console.log("Rodando na porta 3000!");
});