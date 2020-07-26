const express     =  require('express')
const instructors =  require('./instructors')

const routes     =  express.Router()


// GETS
routes.get('/', (req, res) => {   
    return res.redirect('/instructors')
})

routes.get('/instructors', (req, res) => {   
    return res.render('instructors/index')
})

routes.get('/instructors/create', (req, res)=>{
    return res.render('instructors/create')
})

routes.get('/members',  (req, res) => {   
    return res.send('members')
})

//POSTS
routes.post('/instructors', instructors.post)

module.exports   = routes


