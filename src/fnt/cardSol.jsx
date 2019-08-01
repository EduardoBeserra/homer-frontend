import React from 'react'
import Card from './card'

export default props => {

    let solicitacoes = props.solicitacoes || []

    return (
        <Card title={props.titulo} subtitle={props.subtitulo}>
            <p>{solicitacoes.length}</p>
            <div className="row">
                <div className="col-4">
                    <div onClick={() => props.showEtapa(solicitacoes, props.tipoSol)}
                        className="btn btn-link cursor-link"
                        style={{ padding: 0 }}>
                        Etapa
                    </div>
                </div>
                <div className="col-4">
                    <div onClick={() => props.showUsuario(solicitacoes, props.tipoSol)}
                        className="btn btn-link cursor-link"
                        style={{ padding: 0 }}>
                        Usuário
                    </div>
                </div>
                <div className="col-4">
                    <div onClick={() => props.showModulo(solicitacoes, props.tipoSol)}
                        className="btn btn-link cursor-link"
                        style={{ padding: 0 }}>
                        Módulo
                    </div>
                </div>
            </div>
        </Card>
    )
}