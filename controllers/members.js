//arquivo de funções para os instrutores
const fs       =  require('fs')
const data     =  require('../data.json')
const { age, date }  =  require('../utils')

//list
exports.list = function(req, res){   
    return res.render('members/index', {members: data.members})
}
 
//show
exports.show = function(req, res){
    const { id } = req.params

    const memberFound = data.members.find((member)=>{
        return member.id == id
    })

    if(!memberFound)
        return res.send('Instructor not found!')      

    //aplicar algumas correções nos valors
    const member = {

        //Sobrescrever algumas propriedades do objeto memberFound
        ... memberFound,        
        age: age(memberFound.birth),
        services: memberFound.services.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(memberFound.created_at)
    }

    return res.render('members/show', {member})

}

//create
exports.create = function(req, res){
    return res.render('members/create')
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
    const id = Number(data.members.length + 1)

   


    data.members.push({
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

        return res.redirect('/members')
    })



    //return res.send(keys)
}

//edit
exports.edit = function(req, res){
    const { id } = req.params

    const memberFound = data.members.find((member)=>{
        return member.id == id
    })

    if(!memberFound)
        return res.send('Instructor not found!')
        
        //Editando o campo age do usuário
        const member = {
            ...memberFound,
            age: date(memberFound.birth)
        }    
    
    


    return res.render('members/edit', {member})
}

//put
exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const memberFound = data.members.find((member, foundindex)=>{
        if(member.id == id){
            index = foundindex
            return true
        }
    })

    if(!memberFound)
        return res.send('Instructor not found!')

    
    //criando um novo objeto com os dados atualizados
    const member = {
        ...memberFound,
        ...req.body,
           birth:Date.parse(req.body.birth)
    }

    //Atualizando o objeto no Data.json

    data.members[index] = member

    //Escrever um arquivo Json com os dados que estão vindo do front
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write Fille Error')

        return res.redirect(`/members/${id}`)
    })   


}

//delete
exports.delete = function(req, res){
    const { id } = req.body   
    
    
    const fillteredInstructors = data.members.filter((member) =>{
        return member.id != id       
    })

    //Deletando o instrutor passado
    data.members = fillteredInstructors

    
    //Escrever um arquivo Json com os dados que estão vindo do front
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write Fille Error')

        return res.redirect(`/members/`) 
    })   
   

}