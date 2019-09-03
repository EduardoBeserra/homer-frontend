import React, { Component } from 'react'
import Select from '../common/select'
import axios from 'axios'
import { download } from "../common/download";
import ReactNotification from "react-notifications-component";

const URL = 'http://prg01.datacoper.com.br:40580/IntegradorProgress/rest/Properties'
const URLHomer = 'http://prg01.datacoper.com.br:40580/Homer/rest/'

export default class Diferenca extends Component {

    constructor(props) {
        super(props)
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
        this.state = { bases: [],
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
        let {title, message, type, duration} = obj
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
            if(bases.filter(base => {return base === "BDMain.properties"}).length > 0)
                baseMain = "BDMain.properties"
            this.setState({...this.state, bases, baseMain })
        })
    }

    gerarDif = () => {
        this.reqDif()
    }

    reqDif = () => {
        let {baseMain, baseDestino, tabelas = 'all'} = this.state
        
        tabelas = tabelas === '' ? 'all' : tabelas

        if(this.validarDados()) {
            this.setState({...this.state, enSubmit: false})
            console.log("Fazendo Requisicao")
            axios.get(`${URLHomer}diff?baseMain=${baseMain}&baseDestino=${baseDestino}&tabelas=${tabelas}`).then(resp => {
                download(resp.data, this.state.nomearq)
                this.addNotification({
                    title: 'Concluído',
                    message: 'Terminou a geração da DF de diferença!',
                    type: 'success'
                })
                this.setState({...this.state, enSubmit: true})
            }).catch(resp => {
                this.addNotification({
                    title: 'Erro!',
                    message: resp.toString(),
                    type: 'danger'
                })
                this.setState({...this.state, enSubmit: true})
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
        this.setState({...this.state, tabelas: evt.target.value})
    }

    changeNome = (evt) => {
        this.setState({...this.state, nomearq: evt.target.value})
    }

    validarDados = () => {
        let valido = true
        let message = ''
        if(this.state.baseMain === '') {
            message = "Campo Base Main de preenchimento obrigatório."
            valido = false
        } else if(this.state.baseDestino === '') {
            message = "Campo Base Destino de preenchimento obrigatório."
            valido = false
        }
        if(!valido)
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
            <div className="container">
                <h3>Diferença entre Bases</h3>
                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <Select label="Base Main" list={list} chave="conteudo" valor="conteudo"
                            onChange={this.setSelectMain} default={this.state.baseMain} />
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <Select label="Base Destino" list={list} chave="conteudo" valor="conteudo"
                            onChange={this.setSelectDestino} />
                    </div>
                    <div className="form-group col-md-2 col-sm-12 text-left" style={{paddingTop: "5px"}}>
                        <label htmlFor="inTabelas">Tabelas</label>
                        <input type="text" className="form-control" id="inTabelas"
                            value={this.state.tabelas}
                            onChange={this.changeTabelas} />
                    </div>
                    <div className="form-group col-md-2 col-sm-12 text-left" style={{paddingTop: "5px"}}>
                        <label htmlFor="inNome">Nome Arquivo</label>
                        <input type="text" className="form-control" id="inNome"
                            value={this.state.nomearq}
                            onChange={this.changeNome} />
                    </div>
                    <div className="col-md-2 col-sm-12" style={{ paddingTop: "37px", border: "0px"}}>
                        <button type="button" className=" btn btn-primary btn-block" onClick={this.gerarDif}
                            disabled={!this.state.enSubmit}>
                            Só Vai
					    </button>
                    </div>
                </div>
                <ReactNotification ref={this.notificationDOMRef} />
            </div>
        )
    }
}