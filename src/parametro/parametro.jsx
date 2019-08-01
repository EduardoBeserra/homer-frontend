import React, { Component } from "react";
import If from '../common/if'
import ParametroLista from './parametro_list'
import axios from "axios";
import ParametroEdit from "./parametro_edit";
import Modal from "../common/modal";

const URL = 'http://10.30.5.16:3003/api/parametro'

export default class Parametro extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cadastro: false,
            showModal: false,
            parametro: {
                nome: '',
                conteudo: ''
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
        this.onChangeNome = this.onChangeNome.bind(this)
        this.onChangeConteudo = this.onChangeConteudo.bind(this)
        this.hideModal = this.hideModal.bind(this)

        this.refresh()
    }

    refresh = () => {
        axios.get(URL).then(resp => {
            this.setState({ ...this.state, list: resp.data })
        })
    }

    novoParametro = () => {
        return {
            nome: '',
            conteudo: ''
        }
    }

    salvar = (param) => {
        this.setState({ ...this.state, parametro: param, cadastro: false })
        if (param._id)
            this.update(param)
        else
            this.save(param)
    }

    save = (param) => {
        axios.post(`${URL}`, param).then(
            resp => this.refresh()
        )
    }

    update = (param) => {
        axios.put(`${URL}/${param._id}`, param).then(
            resp => this.refresh()
        )
    }

    delete = (param) => {
        axios.delete(`${URL}/${param._id}`).then(resp => {
            this.setState({...this.state, showModal: false})
            this.refresh()
        })
    }

    editar = (param) => {
        this.setState({ ...this.state, parametro: param, cadastro: true })
    }

    cancelar = () => {
        this.setState({ ...this.state, parametro: this.novoParametro(), cadastro: false })
    }

    novo = () => {
        this.setState({ ...this.state, parametro: this.novoParametro(), cadastro: true })
    }

    excluir = (param) => {
        this.setState({ ...this.state, parametro: param, showModal: true })
    }

    onChangeNome = (e) => {
        let { parametro } = this.state
        parametro.nome = e.target.value
        this.setState({ ...this.state, parametro })
    }

    onChangeConteudo = (e) => {
        let { parametro } = this.state
        parametro.conteudo = e.target.value
        this.setState({ ...this.state, parametro })
    }

    hideModal = () => {
        this.setState({...this.state, showModal: false})
    }

    render = () => {
        return (
            <div className="container">
                <If test={this.state.cadastro}>
                    <ParametroEdit param={this.state.parametro}
                        cancelar={this.cancelar}
                        salvar={this.salvar}
                        onChangeNome={this.onChangeNome}
                        onChangeConteudo={this.onChangeConteudo}
                    />
                </If>
                <If test={!this.state.cadastro}>
                    <ParametroLista list={this.state.list} editar={this.editar} novo={this.novo}
                        excluir={this.excluir} />
                </If>
                <Modal obj={this.state.parametro}
                    msg="Tem certeza que deseja excluir este item?"
                    confirm={this.delete}
                    hide={this.hideModal}
                    show={this.state.showModal} />
            </div>
        )
    }
}