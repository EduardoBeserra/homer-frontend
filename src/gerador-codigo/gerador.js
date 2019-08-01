const parametroUtil = require('../parametro/parametro_util')
const axios = require('axios')

const gerarDf = table => {
    let obj = {table}

    parametroUtil.get('url_homer').then(url => {
        axios.post(`${url}/rest/df/gerar`, obj).then(resp => {
            console.log(resp.data)
        })
    })
}

const gerar = config => {
    if(config.gerarDf)
        gerarDf(config.table)
}

module.exports = { gerar }