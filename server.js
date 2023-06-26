    
const  cluster = require('cluster');
const  os = require('os');

const runPrimaryProcess = () =>
{
    const cpu = os.cpus().length * 2 ;
    console.log('primary'+  process.pid + 'is running')
    console.log(`Forking server with ${cpu} processes\n`)

    for (let index =0; index < cpu;index ++)
    {
        cluster.fork()
        cluster.on('exit',(worker,code,signal)=>
        {
            if(code !==0 && !worker.exitedAfterDisconnect)
            {
                console.log(`Servidor rodando na porta 3000 processo: ${worker.process.pid}`)
                cluster.fork()
            }
        })
    }
    
}

const runWorkerProcess = async () =>
{
    await require('./index.js')
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess ()