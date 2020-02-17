import React, { Component } from 'react'
import Select from '../common/select'
import axios from 'axios'
import { download } from "../common/download";
import ReactNotification from "react-notifications-component";

import './diferenca.css'

const URL = 'http://prg01.datacoper.com.br:40580/IntegradorProgress/rest/Properties'
const URLHomer = 'http://prg01.datacoper.com.br:40580/Homer/rest/'

export default class Diferenca extends Component {

    constructor(props) {
        super(props)
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
        this.state = {
            bases: [],
            enSubmit: true,
            baseMain: '',
            baseDestino: '',
            tabelas: '',
            showMessage: false,
            nomearq: ''
        }
        this.setSelectMain = this.setSelectMain.bind(this)
        this.setSelectDestino = this.setSelectDestino.bind(this)
        this.getBases()
    }

    componentWillMount = () => {
    }

    addNotification(obj) {
        let { title, message, type, duration } = obj
        let duracao = duration || 2000
        this.notificationDOMRef.current.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "bottom",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: duracao },
            dismissable: { click: true }
        });
    }

    getBases = () => {
        axios.get(URL).then(resp => {
            let bases = []
            let baseMain = ''
            bases.push('')
            Array.prototype.push.apply(bases, resp.data)
            if (bases.filter(base => { return base === "BDMain.properties" }).length > 0)
                baseMain = "BDMain.properties"
            this.setState({ ...this.state, bases, baseMain })
        })
    }

    gerarDif = () => {
        this.reqDif()
    }

    reqDif = () => {
        let { baseMain, baseDestino, tabelas = 'all' } = this.state

        tabelas = tabelas === '' ? 'all' : tabelas

        if (this.validarDados()) {
            this.setState({ ...this.state, enSubmit: false })
            console.log("Fazendo Requisicao")
            axios.get(`${URLHomer}diff?baseMain=${baseMain}&baseDestino=${baseDestino}&tabelas=${tabelas}`).then(resp => {
                download(resp.data, this.state.nomearq)
                this.addNotification({
                    title: 'Concluído',
                    message: 'Terminou a geração da DF de diferença!',
                    type: 'success'
                })
                this.setState({ ...this.state, enSubmit: true })
            }).catch(resp => {
                this.addNotification({
                    title: 'Erro!',
                    message: resp.toString(),
                    type: 'danger'
                })
                this.setState({ ...this.state, enSubmit: true })
            })
        }
    }

    setSelectMain = (evt) => {
        this.setState({ ...this.state, baseMain: evt.target.value })
    }

    setSelectDestino = (evt) => {
        this.setState({ ...this.state, baseDestino: evt.target.value })
    }

    changeTabelas = (evt) => {
        this.setState({ ...this.state, tabelas: evt.target.value })
    }

    changeNome = (evt) => {
        this.setState({ ...this.state, nomearq: evt.target.value })
    }

    validarDados = () => {
        let valido = true
        let message = ''
        if (this.state.baseMain === '') {
            message = "Campo Base Main de preenchimento obrigatório."
            valido = false
        } else if (this.state.baseDestino === '') {
            message = "Campo Base Destino de preenchimento obrigatório."
            valido = false
        }
        if (!valido)
            this.addNotification({
                title: "Atenção",
                message,
                type: "warning"
            })
        return valido
    }

    render() {
        let list = this.state.bases.map(prop => {
            return { conteudo: prop }
        })
        return (
            <div className="conteudo">
                <h3>Diferença entre Bases</h3>
                <div className="row">
                    <ul className="form-flex col-lg-6 col-md-12">
                        <li className="campo">
                            <label className="label-form">Base Main</label>
                            <Select list={list} chave="conteudo" valor="conteudo"
                                onChange={this.setSelectMain} default={this.state.baseMain}
                                className="select-form" />
                        </li>
                        <li className="campo">
                            <label className="label-form">Base Destino</label>
                            <Select list={list} chave="conteudo" valor="conteudo"
                                onChange={this.setSelectDestino}
                                className="select-form" />
                        </li>
                        <li className="campo">
                            <label className="label-form">Tabelas</label>
                            <input type="text" className="input-form"
                                value={this.state.tabelas}
                                onChange={this.changeTabelas} />
                        </li>
                        <li className="campo">
                            <label className="label-form">Nome Arquivo</label>
                            <input type="text" className="input-form"
                                value={this.state.nomearq}
                                onChange={this.changeNome} />
                        </li>
                        <li className="button">
                            <button type="button" className="btn btn-primary btn-block"
                                onClick={this.gerarDif}
                                disabled={!this.state.enSubmit}>
                                Só Vai
					    </button>
                        </li>
                    </ul>
                    <div className="col-lg-6 col-md-12"></div>
                </div>
                <ReactNotification ref={this.notificationDOMRef} />
            </div>
        )
    }
}