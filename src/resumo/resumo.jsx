import React from 'react'

export default props => (
    <div className={props.className}>
        <div className="cb-titulo">Resumo</div>
        <button className="btn btn-primary" onClick={props.execute}>Executar</button>
    </div>
)