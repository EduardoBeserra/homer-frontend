import React from 'react'
import { getModulo } from "./moduloUtil";

export default props => {

    const url = 'http://projetos01.datacoper.com.br/issues/'
    let descricao = props.detalhes.descricao
    const getUsuario = usuario => {
        let id = usuario ? usuario.id : 0
        let list =  props.usuarios.filter(u => {
            return u.id === id
        })
        return list.length > 0 ? list[0].name : ''
    }

    const getCliente = id => {
        let listCliente = props.clientes.filter(c => {
            return c.id === id
        })
        return listCliente.length > 0 ? listCliente[0].nome : id
    }

    const getModuloDesc = tarefa => {
        let id = getModulo(tarefa)
        let listModulo = props.modulos.filter(m => {
            return m.id === id
        })
        return listModulo.length > 0 ? listModulo[0].name : id
    }

    const renderLinhas = () => {
        let {list} = props.detalhes

        list = list.sort((t1, t2) => {
            if(t1.id === t2.id)
                return 0
            return t1.id > t2.id ? -1 : 1
        })

        return list.map(tarefa => {
            let solicitacao = ''
            let cliente = ''
            if(tarefa.custom_fields) {
                let fieldSol = tarefa.custom_fields.filter(f => {
                    return f.id === 51
                })
                if(fieldSol.length > 0)
                    solicitacao = fieldSol[0].value || ''

                let fieldCliente = tarefa.custom_fields.filter(f => {
                    return f.id === 18
                })
                cliente = fieldCliente[0].value || ''
            }

            return (
                <tr key={tarefa.id}>
                    <td>
                        <a href={`${url}${tarefa.id}`} target="_blank" rel="noopener noreferrer">{tarefa.id}</a>
                    </td>
                    <td>{solicitacao}</td>
                    <td>{getCliente(cliente)}</td>
                    <td>{getUsuario(tarefa.assigned_to)}</td>
                    <td className="text-left">{tarefa.subject}</td>
                    <td>{tarefa.estimated_hours}</td>
                    <td>{getModuloDesc(tarefa)}</td>
                    {props.situacao ? <td>{tarefa.status.name}</td> : ''}
                </tr>
            )
        })
    }
    return (
        <div>
            <h3>{ descricao }</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th><button className="link">Tarefa</button></th>
                        <th>Solicitação</th>
                        <th>Cliente</th>
                        <th>Usuário</th>
                        <th>Descrição</th>
                        <th>Horas</th>
                        <th>Módulo</th>
                        {props.situacao ? <th>Situação</th> : ''}
                    </tr>
                </thead>
                <tbody>
                    {renderLinhas()}
                </tbody>
            </table>
        </div>
    )
}