const gerador = require('./gerador')

var config = {
    gerarDf: true,
    table: {
        name: "jos001",
        fields: [{
            name: "empresa", type: "int"
        }, {
            name: "nome", type: "char", label: "Nome: ", required: true
        }, {
            name: "conteudo", type: "character", description: "Teste de campo com descricao"
        }]
    }
}

gerador.gerar(config)
