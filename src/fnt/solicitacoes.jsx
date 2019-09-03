import React, { Component } from 'react'
import axios from 'axios'

import If from '../common/if'
import SolsEtapa from './solsEtapa'
import SolsUsuario from './solsUsuario'
import SolsModulo from './solsModulo'
import DetalhesSol from './detalhesSols'
import CardSol from './cardSol'
import dados from '../dados'

const URLBASE = 'http://projetos01.datacoper.com.br/issues.json'
const idTrackerBUG = 10
const projetos = [
    {id:70, name: 'Progress - Time 01'},
    {id:71, name: 'Progress - Time 02'},
    {id:72, name: 'Progress - Time 03'}
]
const base64 = Buffer.from(`${dados.usuario}:${dados.senha}`).toString('base64')
const config = {
    headers: {"Authorization": "Basic " + base64}
}

export default class Solicitacoes extends Component {

    usuarios = []
    etapas = []
    clientes = []
    modulos = []

    constructor(props) {
        super(props)
        this.state = {
            solicitacoes: [],
            show: 'geral',
            detalhe: {
                descricao: '',
                list: []
            },
            listagemPor: '',
            listagem: {
                tipoSol: '',
                tipoLista: '',
                list: []
            }
        }
        this.detalhar = this.detalhar.bind(this)
        this.showEtapa = this.showEtapa.bind(this)
        this.showUsuario = this.showUsuario.bind(this)
        this.showModulo = this.showModulo.bind(this)
        this.criarClientes()
        this.criarModulos()
        this.carregarSols(false)
        this.interval = setInterval(() => this.carregarSols(true), 300000);
    }

    reqget = (url, offset, projeto) => {
        let carac = url.includes('?') ? '&' : '?'
        let limit = 100
        let urlaux = `${url}${carac}offset=${offset}&limit=${limit}`
        console.log(urlaux)
        axios.get(urlaux, config).then(resp => {
            console.log(`Fim consulta (Projeto: ${projeto.name})`)
            let solicitacoes = this.state.solicitacoes
            Array.prototype.push.apply(solicitacoes, resp.data.issues)
            this.getUsuarios(resp.data.issues)
            this.getEtapas(resp.data.issues)
            this.atualizarListagem()
            this.setState({...this.state, solicitacoes})

            if(resp.data.total_count > offset + limit)
                this.reqget(url, offset + limit, projeto)
                
        }).catch(err => {
            console.log(`Parece que deu erro. (Projeto: ${projeto.name})`)
            console.log(err)
        })
    }

    carregarSols = (setState) => {
        if(setState)
            this.setState({...this.state, solicitacoes: []})

        projetos.forEach(projeto => {
            let url = `${URLBASE}?project_id=${projeto.id}`
            this.reqget(url, 0, projeto)
        })
    }

    getUsuarios = tarefas => {
        tarefas.map(tarefa => {
            return {...tarefa.assigned_to}
        }).forEach(usuario => {
            if(this.usuarios.filter(u => {
                return u.id === usuario.id
            }).length === 0) {
                this.usuarios.push(usuario)
            }
        })
    }

    getEtapas = tarefas => {
        tarefas.map(tarefa => {
            return {...tarefa.status}
        }).forEach(etapa => {
            if(this.etapas.filter(e => {
                return e.id === etapa.id
            }).length === 0) {
                this.etapas.push(etapa)
            }
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

    criarModulos = () => {
        this.modulos.push({ id:    '', name: 'Sem Módulo'})
        this.modulos.push({ id:  '84', name: 'Fiscal'})
        this.modulos.push({ id: '101', name: 'Contábil'})
        this.modulos.push({ id: '102', name: 'Agrícola'})
        this.modulos.push({ id: '103', name: 'Financeiro'})
        this.modulos.push({ id: '104', name: 'Estoque'})
        this.modulos.push({ id: '105', name: 'Vendas'})
        this.modulos.push({ id: '106', name: 'Compras'})
        this.modulos.push({ id: '111', name: 'Integrações'})
        this.modulos.push({ id: '112', name: 'E-doc'})
        this.modulos.push({ id: '113', name: 'Serviços'})
        this.modulos.push({ id: '114', name: 'Cadastros'})
        this.modulos.push({ id: '115', name: 'Integração'})
        this.modulos.push({ id: '119', name: 'Indústria'})
        this.modulos.push({ id: '120', name: 'Geral'})
        this.modulos.push({ id: '121', name: 'Relatórios'})
        this.modulos.push({ id: '156', name: 'Patrimonial'})
    }

    showGeral = () => {
        this.setState({...this.state, show: 'geral'})
    }

    filtrar = (tipo) => {
        let idTracker = 0
        let listagem = []
        switch(tipo) {
            case 'bugs':
                idTracker = idTrackerBUG
                break
            default:
                idTracker = 0
        }
        if(idTracker > 0)
            listagem = this.state.solicitacoes.filter(sol => {
                return sol.tracker.id === idTracker
            })
        else
            listagem = this.state.solicitacoes
        return listagem
    }

    showEtapa = (list, tipoSol) => {
        this.setState({...this.state, show: 'etapa', listagem: {tipoSol, tipoLista: 'etapa', list}})
    }
    showUsuario = (list, tipoSol) => {
        this.setState({...this.state, show: 'usuario', listagem: {tipoSol, tipoLista: 'usuario', list}})
    }
    showModulo = (list, tipoSol) => {
        this.setState({...this.state, show: 'modulo', listagem: {tipoSol, tipoLista: 'modulo', list}})
    }

    showDetalhes = () => {
        this.setState({...this.state, show: 'detalhe'})
    }

    detalhar = (descricao, list, listagemPor) => {
        this.setState({...this.state, show: 'detalhe', detalhe: {descricao, list}, listagemPor})
    }

    atualizarListagem = () => {
        let list = this.filtrar(this.state.listagem.tipoSol)
        let {listagem} = this.state
        listagem.list = list
        this.setState({...this.state, listagem})
    }

    getSolsPlantar = () => {
        let sols = this.state.solicitacoes.filter(s => {
            return this.getCliente(s) === '56'
        })
        return sols
    }

    getCliente = (sol) => {
        let cliente = ''
        if(sol.custom_fields) {
            let fieldCliente = sol.custom_fields.filter(f => {
                return f.id === 18
            })
            cliente = fieldCliente[0].value || ''
            return cliente
        } else return ''
    }

    render = () => {
        let func
        switch(this.state.listagem.tipoLista) {
            case 'usuario':
                func = this.showUsuario
                break
            case 'etapa':
                func = this.showEtapa
                break
            case 'modulo':
                func = this.showModulo
                break
            default:
                func = this.showUsuario
        }

        let solsBugs = this.filtrar('bugs')

        return (
            <div className="container">
                <If test={this.state.show === 'geral'}>
                    <div className="row">
                        <CardSol solicitacoes={this.state.solicitacoes} tipoSol='geral'
                            showEtapa={this.showEtapa} showUsuario={this.showUsuario} showModulo={this.showModulo}
                            titulo='Geral' subtitulo='Total' />
                        <CardSol solicitacoes={solsBugs} tipoSol='bugs'
                            showEtapa={this.showEtapa} showUsuario={this.showUsuario} showModulo={this.showModulo}
                            titulo='Bugs' subtitulo='Total' />
                    </div>
                </If>
                <If test={this.state.show === 'etapa'}>
                    <div className="row">
                        <div className="col-12 text-right">
                            <div onClick={this.showGeral} className="btn btn-link text-right cursor-link">
                                &lt;-Voltar
                            </div>
                        </div>
                    </div>
                    <SolsEtapa list={this.state.listagem.list} etapas={this.etapas} detalhar={this.detalhar}/>
                </If>
                <If test={this.state.show === 'usuario'}>
                    <div className="row">
                        <div className="col-12 text-right">
                            <div onClick={this.showGeral} className="btn btn-link text-right cursor-link">
                                &lt;-Voltar
                            </div>
                        </div>
                        <SolsUsuario list={this.state.listagem.list} usuarios={this.usuarios} detalhar={this.detalhar}/>
                    </div>
                </If>
                <If test={this.state.show === 'modulo'}>
                    <div className="row">
                        <div className="col-12 text-right">
                            <div onClick={this.showGeral} className="btn btn-link text-right cursor-link">
                                &lt;-Voltar
                            </div>
                        </div>
                        <SolsModulo list={this.state.listagem.list} modulos={this.modulos} detalhar={this.detalhar}/>
                    </div>
                </If>
                <If test={this.state.show === 'detalhe'}>
                    <div className="row">
                        <div className="col-12 text-right">
                            <div onClick={() => func(this.state.listagem.list, this.state.listagem.tipoSol)}
                                className="btn btn-link text-right cursor-link">
                                &lt;-Voltar
                            </div>
                        </div>
                    </div>
                    <DetalhesSol detalhes={this.state.detalhe}
                        usuarios={this.usuarios}
                        clientes={this.clientes}
                        modulos={this.modulos}
                        situacao={this.state.listagem.tipoLista === 'modulo'} />
                </If>
            </div>
        )
    }
}