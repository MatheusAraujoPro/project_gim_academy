//arquivo de funções para os instrutores
const fs   =  require('fs')
const data =  require('./data.json')

//show
exports.show = function(req, res){
    const { id } = req.params

    const instructorFound = data.instructors.find((instructor)=>{
        return instructor.id == id
    })

    if(!instructorFound)
        return res.send('Instructor not found!')

    //aplicar algumas correções nos valors
    const instructor = {

        //Sobrescrever algumas propriedades do objeto instructorFound
        ... instructorFound,        
        age: '',
        services: instructorFound.services.split(','),
        created_at: ''
    }

    return res.render('instructors/index', {instructor})

}

//create
exports.post = function(req, res) {    
    //Usando um constructor para a validação
    const keys = Object.keys(req.body)
    
    for(key of keys){
        //req.body.keys == ''
        if(req.body[key] == '')
            return res.send('Please, fill all fields!')
    }

    //Desestruturar o objeto req.body
    let {avatar_url, name, birth, gender, services } = req.body

    //Adcionando  e organizando propriedades ao objeto

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)


    data.instructors.push({
        id,    
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    //Escrever um arquivo Json com os dados que estão vindo do front
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write Fille Error')

        return res.redirect('/instructors')
    })

    //return res.send(keys)
}