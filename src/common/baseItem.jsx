import React, { Component } from 'react'
import imgSucesso from '../img/homer_sucesso.png'
import imgErro from '../img/homer_erro.png'

export default class BaseItem extends Component {

    render() {
        let {base} = this.props
        let estilo = base.selected ? 'base-item-sel' : 'base-item'
        let img

        if(base.status === 'CONCLUIDO') {
            estilo = 'base-item-sucesso'
            img = imgSucesso
        } else if(base.status === 'ERRO') {
            estilo = 'base-item-erro'
            img = imgErro
        }

        let objImg
        if(img)
            objImg = <img src={img} alt="Homer"></img>

        return (
            <div className={`base-item ${estilo}`} onClick={() => this.props.onClick(base)}>
                <div className="base-item-txt">{base.name}</div>
                <div className="base-item-img">{ objImg }</div>
            </div>
        )
    }
}