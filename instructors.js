const fs   =  require('fs')
const data =  require('./data.json')

//arquivo de funções para os instrutores
exports.post = function(req, res) {    
    //Usando um constructor para a validação
    const keys = Object.keys(req.body)
    
    for(key of keys){
        //req.body.keys == ''
        if(req.body[key] == '')
            return res.send('Please, fill all fields!')
    }

    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now()

    data.instructors.push(req.body)

    //Escrever um arquivo Json com os dados que estão vindo do front
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write Fille Error')

        return res.redirect('/instructors')
    })

    //return res.send(keys)
}