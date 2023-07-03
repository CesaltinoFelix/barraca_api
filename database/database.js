
const Sequelize = require('sequelize');
const fs = require('fs')
const path = require('path');
/*const sequelize = new Sequelize('barraca','root','', {
    host: 'localhost',
    dialect: 'mysql'
}); 
*/
const sslCertPath = path.resolve(__dirname, 'DigiCertGlobalRootCA.crt.pem');

const connection = new Sequelize(
{
    username: 'Reginaldo',
    password: 'naldo_2019',
    database: 'barraca',
    host: 'barracaserver.postgres.database.azure.com',
    port:5432,  
    ssl: {
        rejectUnauthorized: false
    },
    dialect: 'postgres'
})


//module.exports = { sq: sequelize, testDbConnection }; ssl:{ca:fs.readFileSync("{pg_hba.conf}")},
//module.exports = sequelize;
module.exports = connection;

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