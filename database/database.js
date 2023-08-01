
const Sequelize = require('sequelize');
const path = require('path')
const fs = require('fs')
const caminho = path.resolve(__dirname,'DigiCertGlobalRootCA.crt (1).pem')



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

*/
//module.exports = { sq: sequelize, testDbConnection }; ssl:{ca:fs.readFileSync("{pg_hba.conf}")},
module.exports = sequelize;
//module.exports = connection;

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