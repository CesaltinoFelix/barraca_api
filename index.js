const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
const connection = require("./database/database"); 
const { once } = require('events');



async function handler(request, response) {
    try {
      const data = JSON.parse(await once(request, 'data'));
      console.log('\nreceived', data);
      response.writeHead(200);
      response.end(JSON.stringify(data));
    } catch (error) {
      console.error('erro ocorreu \n', error.stack);
      response.writeHead(500);
      response.end();
    }
  }



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
const sales = require("./routes/sales");
const users = require("./routes/users");
const invoice = require("./routes/invoice");
const message =require("./routes/message");
const email = require("./routes/email")
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
app.use("/", sales)
app.use("/", users)
app.use("/", invoice)
app.use("/",message)
app.use("/",email)

 

app.listen(3000, ['10.0.0.118','192.168.41.154','192.168.100.56','192.168.12.154','localhost'],
()=>{
    console.log(`Servidor rodando na porta 3000 processo: ${process.pid}`);
//    handler()
});




process.on('SIGTERM',()=>
{   console.log('servidor encerrando')
    server.close(()=>{process.exit()})
})

process.on('uncaughtException',(error,origin) =>
{
    console.log(`Ocorreu algum erro! \n Erro : ${error}\n Origem: ${origin}`)
})
process.on('unhandledRejection',(error)=>
{
    console.log(`Ocorreu alugm erro! \nErro:${error}`)
})