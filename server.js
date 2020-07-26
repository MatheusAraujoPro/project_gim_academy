//importando express
const express  = require('express')
const nunjucks = require('nunjucks')
const routes   = require('./routes')

const server   = express()


//Config
server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server, //variável do express
    autoescape: false, //interpolar html com strings
    noCache: true   //Não guardar cache
})


//Criando o servidor
server.listen(8080, () =>{
    console.log('Running') 
})

