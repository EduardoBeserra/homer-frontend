const axios = require("axios");
const URL = 'http://10.30.5.16:3003/api/parametro'

const getParametro = async (parametro) => {

    let promisesList = []
    let retornos = []
    if(parametro.constructor === Array) {
        parametro.forEach(pnome => {
            promisesList.push(
                axios.get(`${URL}?nome=${pnome}`).then(resp => {
                    if(resp.data.length > 0) {
                        let obj = resp.data[0]
                        return {nome: obj.nome, conteudo: obj.conteudo}
                    }
                })
            )
        })
    } else {
        promisesList.push(
            axios.get(`${URL}?nome=${parametro}`).then(resp => {
                if(resp.data.length > 0) {
                    let obj = resp.data[0]
                    return {nome: obj.nome, conteudo: obj.conteudo}
                }
            })
        )
    }

    await Promise.all(promisesList).then(values => {
        retornos = values
    })

    if(parametro.constructor === Array)
        return retornos
    else
        return retornos[0].conteudo
}

const get = parametro => {
    return getParametro(parametro)
}

module.exports = { get }