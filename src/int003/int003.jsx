import React, { Component } from "react";
import If from '../common/if'
import Int003Lista from './int003_list'
import axios from "axios";
import Int003Edit from "./int003_edit";
import Modal from "../common/modal";

const URL = 'http://prg01.datacoper.com.br:40580/IntegradorProgress/rest/restful/int003'
const BD = '?configBD=BDDesenv.properties'

export default class Int003 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cadastro: false,
            showModal: false,
            registro: {
                empresa: 0,
                nome: '',
                descricao: '',
                programa: ''
            },
            list: []
        }
        this.update = this.update.bind(this)
        this.editar = this.editar.bind(this)
        this.cancelar = this.cancelar.bind(this)
        this.novo = this.novo.bind(this)
        this.salvar = this.salvar.bind(this)
        this.excluir = this.excluir.bind(this)
        this.delete = this.delete.bind(this)
        this.onChange = this.onChange.bind(this)
        this.hideModal = this.hideModal.bind(this)

        this.refresh()
    }

    refresh = () => {
        axios.get(`${URL}${BD}`).then(resp => {
            let list = resp.data.dados.registro.map(r => {
                let obj = {
                    empresa: r.int003_empresa,
                    nome: r.int003_nome,
                    programa: r.int003_programa,
                    descricao: r.int003_descricao,
                    _id: r.int003_empresa + '--' + r.int003_nome
                }
                return obj
            })
            this.setState({ ...this.state, list })
        })
    }

    novoRegistro = () => {
        return {
            empresa: 0,
            nome: '',
            descricao: '',
            programa: ''
        }
    }

    salvar = (registro) => {
        this.setState({ ...this.state, registro, cadastro: false })
        if (registro._id)
            this.update(registro)
        else
            this.save(registro)
    }

    save = (registro) => {
        axios.post(`${URL}${BD}`, registro).then(
            resp => this.refresh()
        )
    }

    update = (registro) => {
        axios.put(`${URL}/${registro._id}${BD}`, registro).then(
            resp => this.refresh()
        )
    }

    delete = (registro) => {
        axios.delete(`${URL}/${registro._id}${BD}`).then(resp => {
            this.setState({...this.state, showModal: false})
            this.refresh()
        })
    }

    editar = (registro) => {
        this.setState({ ...this.state, registro, cadastro: true })
    }

    cancelar = () => {
        this.setState({ ...this.state, registro: this.novoRegistro(), cadastro: false })
    }

    novo = () => {
        this.setState({ ...this.state, registro: this.novoRegistro(), cadastro: true })
    }

    excluir = (registro) => {
        this.setState({ ...this.state, registro, showModal: true })
    }

    onChange = (e, campo) => {
        let {registro} = this.state
        registro[campo] = e.target.value
        this.setState({...this.state, registro})
    }

    hideModal = () => {
        this.setState({...this.state, showModal: false})
    }

    render = () => {
        return (
            <div className="container">
                <If test={this.state.cadastro}>
                    <Int003Edit registro={this.state.registro}
                        cancelar={this.cancelar}
                        salvar={this.salvar}
                        onChange={this.onChange}
                    />
                </If>
                <If test={!this.state.cadastro}>
                    <Int003Lista list={this.state.list} editar={this.editar} novo={this.novo}
                        excluir={this.excluir} />
                </If>
                <Modal obj={this.state.registro}
                    msg="Tem certeza que deseja excluir este item?"
                    confirm={this.delete}
                    hide={this.hideModal}
                    show={this.state.showModal} />
            </div>
        )
    }
}