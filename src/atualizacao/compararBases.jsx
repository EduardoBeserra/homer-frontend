import React, { Component } from "react";
import axios from 'axios'

import BasesCheckBox from './basesCheckBox'
import Select from '../common/select'

const URL = 'http://prg01.datacoper.com.br:40580/IntegradorProgress/rest/Properties'
const URL_DUMP = 'http://prg01.datacoper.com.br:40580/Homer/rest/'

export default class CompararBases extends Component {

    constructor(props) {
        super(props)
        this.state = { bases: [], baseMain: 'BDMain.properties', tabelas: 'est001'}
        this.changeItem = this.changeItem.bind(this)
        this.executar = this.executar.bind(this)
        this.getBases()
    }

    getBases = () => {
        axios.get(URL).then(resp => {
            this.setState(
                {...this.state,
                    bases: resp.data.map(nome => {
                        return {nome: nome, status: '', selected: false}
                    })
                }
            )
        })
    }

    changeItem = (base) => {
        let bases = this.state.bases
        base.selected = !base.selected

        let newBases = bases.map(b => {
            if(b.nome === base.nome)
                return base
            else
                return b
        })
        this.setState({...this.state, bases: newBases})
    }

    setBaseStatus = (nomeBase, status) => {
        let newBases = this.state.bases.map(base => {
            if(base.nome === nomeBase)
                return {...base, status}
            else
                return base
        })
        this.setState({...this.state, bases: newBases})
    }

    execDiff = baseMain => {
        this.state.bases.filter(base => {
            return base.selected
        }).forEach(base => {
            let {tabelas} = this.state
            let baseDestino = base.nome
            let url = `${URL_DUMP}diff?baseMain=${baseMain}&baseDestino=${baseDestino}&tabelas=${tabelas}`
            axios.get(url).then(resp => {
                console.log(resp.data)
                this.setBaseStatus(baseDestino, 'CONCLUIDO')
            }).catch(err => {
                this.setBaseStatus(baseDestino, 'ERRO')
                console.log(`Erro base ${baseDestino}`)
                console.log(err)
            })
        })
    }
    executar = () => {
        let {baseMain, tabelas} = this.state
        let url = `${URL_DUMP}dump/filename?base=${baseMain}&tabelas=${tabelas}`
        axios.get(url).then(resp => {
            this.execDiff(`file=${resp.data}`)
        }).catch(err => {
            this.addNotification({
                title: 'Erro ao executar!',
                message: err.toString(),
                type: 'danger'
            })
        })
    }

    setMain = (evt) => {
        this.setState({...this.state, baseMain: evt.target.value})
    }

    render = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6" style={{paddingLeft: "45px"}}>
                        <Select label="Base Main" list={this.state.bases} chave="nome" valor="nome"
                            onChange={this.setMain} default={this.state.baseMain} />
                    </div>
                </div>
                <BasesCheckBox list={this.state.bases} changeItem={this.changeItem} execute={this.executar} />
            </div>
        )
    }
}