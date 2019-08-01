import React, { Component } from 'react'
import imgSucesso from '../img/homer_sucesso.png'
import imgErro from '../img/homer_erro.png'

export default class BaseItem extends Component {

    render = () => {
        let base = this.props.base
        let estilo = base.selected ? 'linebase-marcado' : 'linebase-default'
        let img

        if(base.status === 'CONCLUIDO') {
            estilo = 'linebase-sucesso'
            img = imgSucesso
        } else if(base.status === 'ERRO') {
            estilo = 'linebase-erro'
            img = imgErro
        }
        
        let objImg
        if(img)
            objImg = <img src={img} className="imgbase" alt="Josi"></img>

        return (
            <div className={`d-flex flex-row linebase ${estilo}`}>
                <div className="col-11 labelbase" onClick={() => this.props.onClick(this.props.base)}>
                    {this.props.base.nome}
                </div>

                <div className="d-flex flex-wrap">
                    <div style={{width:38}}>
                        {objImg}
                    </div>
                </div>
            </div>
        )
    }
}