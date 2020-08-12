module.exports = {
    age: function(timestamp){
        //Pegando a data do dia
        const today = new Date()
        //Pegando a data do amiversário da pessoa
        const birthDay = new Date(timestamp)

        //Calculando a idade do usuário
        let age = today.getFullYear() - birthDay.getFullYear()

        //verificando se o mês atual - mês informado é negativo ou positivo
        const month = today.getMonth() - birthDay.getMonth()

        if(month < 0 || month == 0 && today.getDate() < birth.getDate() )
            age = age - 1

        return age

    },
    date: function(timestamp){
        const date = new Date(timestamp)

        //yyyy 
        const year  = date.getUTCFullYear()

        //mm (0 a 11)
        const month = `0${date.getUTCMonth() + 1}`.slice(-2) //pegando os ultimos dois números

        //dd (1 a 31)
        const day   = `0${date.getUTCDate()}`.slice(-2) //pegando os últimos dois números

        return `${year}-${month}-${day}`


    }
}