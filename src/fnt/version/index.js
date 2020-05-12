import React from 'react'

import './styles.css'

export default ({ version }) => {

    const { description, issues} = version

    let group_etapa = {}
    let resumo = []
    const listarDetalhes = () => {
        issues.forEach(i => {
            if (!group_etapa[i.status.id])
                group_etapa[i.status.id] = {
                    id: i.status.id,
                    name: i.status.name,
                    qtd: 0
                }
            group_etapa[i.status.id].qtd += 1
        })

        Object.keys(group_etapa).forEach(k => {
            resumo.push(group_etapa[k])
        })

        return resumo.map(etapa => {
            return <div key={etapa.id}><div className="text-bold">{etapa.name}:</div>{etapa.qtd}</div>
        })
    }
    
    return (
        <div className='version-container'>
            <div><div className="text-bold">Versão: </div>{description}</div>
            <div><div className="text-bold">Tarefas abertas : </div>{issues.length}</div>

            <div className="version-detalhes">
                {listarDetalhes()}
            </div>

        </div>
    )
}