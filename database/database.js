
const Sequelize = require('sequelize');
const path = require('path')
const fs = require('fs')


const sequelize = new Sequelize('barraca','root','', {
    host: 'localhost',
    dialect: 'mysql'
}); 


/*
const sequelize = new Sequelize('barraca','barracabd','naldo_2019', {
    host: 'barracamysql.mysql.database.azure.com',
    
   
    dialect: 'mysql'
}); 

*/

/* const sslCertPath = path.resolve(__dirname, 'DigiCertGlobalRootCA.crt.pem');

>>>>>>> c4177d159fe92702357cec586bd8225cb260356b


/*
const connection = new Sequelize(
{
    username: 'Reginaldo',
    password: 'naldo_2019',
    database: 'barraca',
    host: 'barracaserver.postgres.database.azure.com',
    port:5432,  
    ssl: {
        rejectUnauthorized: false,
       
        
    },
    dialect: 'postgres'
})
<<<<<<< HEAD

*/
//module.exports = { sq: sequelize, testDbConnection }; ssl:{ca:fs.readFileSync("{pg_hba.conf}")},
module.exports = sequelize;
//module.exports = connection;


//module.exports = { sq: sequelize, testDbConnection }; ssl:{ca:fs.readFileSync("{pg_hba.conf}")},

/* 
const connection = new Sequelize(
{
    username: 'Reginaldo',
    password: 'naldo_2019',
    database: 'barraca',
    host: 'barracaserver.postgres.database.azure.com',
    port:5432,
    ssl:{ca: fs.readFileSync(sslCertPath)},
    dialect: 'postgres'
})

*/