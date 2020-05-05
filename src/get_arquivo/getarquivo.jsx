import React, { Component } from 'react'
import axios from 'axios'
import { download } from "../common/download";
import ReactNotification from "react-notifications-component";

const URL = 'http://prg01.datacoper.com.br:40580/IntegradorProgress/rest/getArquivo?file='
export default class GetArquivo extends Component {

    constructor(props) {
        super(props)
        this.state = { arquivo: '/usr/pro/p/desenv/dif/' }
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    addNotification(obj) {
        let {title, message, type, duration} = obj
        duration = duration || 2000
        this.notificationDOMRef.current.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "bottom",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration },
            dismissable: { click: true }
        });
    }

    keyHandler = (e) => {
        if(e.key === 'Enter')
            this.baixar()
    }

    changeArquivo = (evt) => {
        this.setState({ ...this.state, arquivo: evt.target.value })
    }

    baixar = () => {
        let arq = this.state.arquivo
        let filename = arq.substring(arq.lastIndexOf('/') + 1)
        axios.get(`${URL}${this.state.arquivo}`).then(resp => {
            download(JSON.stringify(resp.data), filename)
        }).catch(resp => {
            console.log("Erro")
            console.log(resp)
            this.addNotification({
                title: "Atenção",
                message: "Arquivo não encontrado.",
                type: "danger"
            })
        })
    }

    render = () => {
        return (
            <div className="container">
                <h3>Baixar Arquivo</h3>
                <div className="row">
                    <div className="text-left col-sm-10">
                        <label htmlFor="inArquivo">Arquivo</label>
                        <input type="text" className="form-control" id="inArquivo" value={this.state.arquivo}
                            onKeyUp={this.keyHandler}
                            onChange={this.changeArquivo} />
                    </div>
                    <div className="col-sm-2" style={{paddingTop: "30px"}}>
                        <button className="btn btn-primary" onClick={this.baixar}>Baixar</button>
                    </div>
                </div>
                <ReactNotification ref={this.notificationDOMRef} />
            </div>
        )
    }
}