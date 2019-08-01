import React, { Component } from 'react'

export default class ParametroList extends Component {
    renderizarLinhas = () => {
        let lista = this.props.list || []

        return lista.map(param => (
            <tr key={param._id}>
                <td>{param.nome}</td>
                <td>{param.conteudo}</td>
                <td>
                    <button className="btn btn-warning" onClick={() => this.props.editar(param)}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button className="btn btn-danger ml-2" data-toggle="modal" 
                        onClick={() => this.props.excluir(param)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.props.novo}>
                        <i className="fa fa-plus"></i> Novo
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Conteudo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderizarLinhas()}
                    </tbody>
                </table>
            </div>
        )
    }
}