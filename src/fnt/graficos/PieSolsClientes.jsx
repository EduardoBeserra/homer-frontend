import React, { Component } from 'react'
import axios from 'axios'
import Chart from "react-google-charts";
import dados from '../../dados'
//import Barra from '../testewebsocket'

const projetos = [
    { id: 70, name: 'Progress - Time 01' },
    { id: 71, name: 'Progress - Time 02' },
    { id: 72, name: 'Progress - Time 03' }
]
const URLBASE = 'http://projetos01.datacoper.com.br/issues.json'

const base64 = Buffer.from(`${dados.usuario}:${dados.senha}`).toString('base64')
const config = {
    headers: { "Authorization": "Basic " + base64 }
}

export default class extends Component {

    clientes = []

    constructor(props) {
        super(props)
        this.state = {
            solicitacoes: []
        }
        this.criarClientes()
        this.carregarSols(false)
    }

    carregarSols = () => {
        projetos.forEach(projeto => {
            let url = `${URLBASE}?project_id=${projeto.id}`
            this.reqget(url, 0, projeto)
        })
    }

    criarClientes = () => {
        this.clientes.push({ id: '136', nome: 'Adm_DC' })
        this.clientes.push({ id: '25', nome: 'Agriter' })
        this.clientes.push({ id: '27', nome: 'Agropar' })
        this.clientes.push({ id: '30', nome: 'Bom Jesus' })
        this.clientes.push({ id: '31', nome: 'Camp' })
        this.clientes.push({ id: '33', nome: 'Coagrisol' })
        this.clientes.push({ id: '34', nome: 'Coagro' })
        this.clientes.push({ id: '35', nome: 'Comtul' })
        this.clientes.push({ id: '36', nome: 'Cooalve' })
        this.clientes.push({ id: '38', nome: 'Cooperate Desenv' })
        this.clientes.push({ id: '40', nome: 'Cooperlucas' })
        this.clientes.push({ id: '41', nome: 'Coopermota' })
        this.clientes.push({ id: '42', nome: 'Copasul' })
        this.clientes.push({ id: '43', nome: 'Copermutum' })
        this.clientes.push({ id: '45', nome: 'Cotrisana' })
        this.clientes.push({ id: '46', nome: 'Datacoper' })
        this.clientes.push({ id: '48', nome: 'Fiasul' })
        this.clientes.push({ id: '49', nome: 'Gastroclínica' })
        this.clientes.push({ id: '53', nome: 'Kodyak (Cooagril)' })
        this.clientes.push({ id: '56', nome: 'Plantar' })
    }

    reqget = (url, offset, projeto) => {
        let carac = url.includes('?') ? '&' : '?'
        let limit = 100
        let urlaux = `${url}${carac}offset=${offset}&limit=${limit}`
        console.log(urlaux)
        axios.get(urlaux, config).then(resp => {
            console.log(`Fim consulta (Projeto: ${projeto.name}) Qtd: ${resp.data.issues.length}`)
            let solicitacoes = this.state.solicitacoes
            Array.prototype.push.apply(solicitacoes, resp.data.issues)
            this.setState({ ...this.state, solicitacoes })

            if (resp.data.total_count > offset + limit)
                this.reqget(url, offset + limit, projeto)

        }).catch(err => {
            console.log(`Parece que deu erro. (Projeto: ${projeto.name})`)
            console.log(err)
        })
    }

    montarDados = () => {
        let result = []
        this.state.solicitacoes.reduce((res, sol) => {
            let idCliente = this.getCliente(sol)
            if (!res[idCliente]) {
                res[idCliente] = { id: idCliente, qtd: 0 }
                result.push(res[idCliente])
            }
            res[idCliente].qtd += 1
            return res
        }, {})

        let lista = result.map(cliente => {
            let nome = this.getNomeCliente(cliente.id) || 'Sem Cliente'
            return [
                nome,
                cliente.qtd
            ]
        })

        let retorno = []
        retorno.push(['Clientes', 'Quantidade'])

        lista.forEach(c => {
            retorno.push(c)
        })
        return retorno
    }

    getCliente = (sol) => {
        let idCliente = ''
        if (sol.custom_fields) {
            let fieldCliente = sol.custom_fields.filter(f => {
                return f.id === 18
            })
            idCliente = fieldCliente[0].value || ''
            return idCliente
        } else return ''
    }

    getNomeCliente = id => {
        let listCliente = this.clientes.filter(c => {
            return c.id === id
        })
        return listCliente.length > 0 ? listCliente[0].nome : id
    }

    render() {
        let dados = this.montarDados()
        return (
            <div>
                <Chart
                    width={'800px'}
                    height={'600px'}
                    chartType="PieChart"
                    loader={<div>Aguarde, carregando gráfico de solicitações por cliente.</div>}
                    data={dados}
                    options={{
                        title: 'Clientes',
                        sliceVisibilityThreshold: 0.03,
                    }}
                    rootProps={{ 'data-testid': '7' }}
                />
                { /*<Barra /> */ }
            </div>
        )
    }
}