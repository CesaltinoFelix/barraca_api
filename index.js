const express = require("express");
const rateLimit = require('express-rate-limit');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
const connection = require("./database/database"); 
const { once } = require('events');

/*
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
*/
// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

// limite de requisições por endereço IP

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutos
  max: 50, // 100 solicitações a cada 15min (15 minutos)
});



app.use(cors());
app.use(bodyParser.json({limit:"10mb"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('uploads'));
app.use(limiter)
// arquivos rotas
const products = require("./routes/products");
const uploads = require("./routes/uploads");
const costumers = require("./routes/costumers");
const sales = require("./routes/sales");
const users = require("./routes/users");
const invoice = require("./routes/invoice");
const message = require("./routes/message");
const email = require("./routes/email");
const Chat = require("./routes/chat");

// Conectando com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

// Rotas da plataforma  

app.use("/", products);
app.use("/", uploads);
app.use("/", costumers);
app.use("/", sales);
app.use("/", users);
app.use("/", invoice);
app.use("/", message);
app.use("/", email);
app.use("/", Chat);

// Configurando o Socket.io
io.on('connection', (socket) => {

  // Evento de recebimento de mensagem do cliente
  socket.on('client-message', (data) => {
    // Envie uma mensagem de confirmação para o cliente
    socket.emit('server-message', 'Mensagem recebida pelo servidor');
  });

  // Evento de desconexão do cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciando o servidor
const PORT = 3000; // Porta desejada
server.listen(process.env.PORT || PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('servidor encerrando');
  server.close(() => {
    process.exit();
  });
});

process.on('uncaughtException', (error, origin) => {
  console.log(`Ocorreu 1! \n Erro : ${error}\n Origem: ${origin}`);
});

process.on('unhandledRejection', (error) => {
 
 console.log(`Ocorreu 2! \nErro:${error}`);
});
