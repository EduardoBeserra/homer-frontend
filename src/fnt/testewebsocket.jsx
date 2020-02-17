import React, { Component } from 'react'
const stringTipos = require('./utils/stringTipos')

export default class BarraProgresso extends Component {

    client = {}
    constructor(props) {
        super(props)
        this.state = {
            cliente: '',
            percentual: 0,
            qtdErros: 0
        }
        this.initClientSocket()
    }

    initClientSocket = () => {
        this.client = new WebSocket('ws://prg01.datacoper.com.br:40580/websocketTeste/teste');
        this.client.onopen = () => {
            console.log("Conexao iniciada.")
        }
        this.client.onmessage = (message) => {
            let obj = JSON.parse(message.data)
            switch (obj.tipo) {
                case stringTipos.statusAtualizacao:
                    this.setState(obj.payload)
                    break;
            }
        }

        this.client.onclose = () => {
            console.log("Conexao fechada.")
        }
    }

    render() {
        return (
            <div className="container">
                <div><b>{this.state.cliente}</b></div>
                <ul>
                    <li>{this.state.qtdErros}</li>
                </ul>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow={this.state.percentual}
                        style={{ "width": `${this.state.percentual}%` }}
                        aria-valuemin="0" aria-valuemax="100">{this.state.percentual}%</div>
                </div>
            </div>
        )
    }
}