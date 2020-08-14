//arquivo de funções para os instrutores
const fs       =  require('fs')
const data     =  require('../data.json')
const { age, date }  =  require('../utils')

//list
exports.list = function(req, res){   
    return res.render('instructors/index', {instructors: data.instructors})
}
 
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
        age: age(instructorFound.birth),
        services: instructorFound.services.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(instructorFound.created_at)
    }

    return res.render('instructors/show', {instructor})

}

//create
exports.create = function(req, res){
    return res.render('instructors/create')
}

//post
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

//edit
exports.edit = function(req, res){
    const { id } = req.params

    const instructorFound = data.instructors.find((instructor)=>{
        return instructor.id == id
    })

    if(!instructorFound)
        return res.send('Instructor not found!')
        
        //Editando o campo age do usuário
        const instructor = {
            ...instructorFound,
            age: date(instructorFound.birth)
        }    
    
    


    return res.render('instructors/edit', {instructor})
}

//put
exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const instructorFound = data.instructors.find((instructor, foundindex)=>{
        if(instructor.id == id){
            index = foundindex
            return true
        }
    })

    if(!instructorFound)
        return res.send('Instructor not found!')

    
    //criando um novo objeto com os dados atualizados
    const instructor = {
        ...instructorFound,
        ...req.body,
           birth:Date.parse(req.body.birth)
    }

    //Atualizando o objeto no Data.json

    data.instructors[index] = instructor

    //Escrever um arquivo Json com os dados que estão vindo do front
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write Fille Error')

        return res.redirect(`/instructors/${id}`)
    })   


}

//delete
exports.delete = function(req, res){
    const { id } = req.body   
    
    
    const fillteredInstructors = data.instructors.filter((instructor) =>{
        return instructor.id != id       
    })

    //Deletando o instrutor passado
    data.instructors = fillteredInstructors

    
    //Escrever um arquivo Json com os dados que estão vindo do front
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write Fille Error')

        return res.redirect(`/instructors/`) 
    })   
   

}