import React, { Component } from 'react'

export default class Int003List extends Component {
    renderizarLinhas = () => {
        let lista = this.props.list || []

        return lista.map(registro => (
            <tr key={registro._id}>
                <td>{registro.empresa}</td>
                <td>{registro.nome}</td>
                <td>{registro.programa}</td>
                <td>{registro.descricao}</td>
                <td>
                    <button className="btn btn-warning" onClick={() => this.props.editar(registro)}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button className="btn btn-danger ml-2" data-toggle="modal" 
                        onClick={() => this.props.excluir(registro)}>
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
                            <th>Empresa</th>
                            <th>Nome</th>
                            <th>Programa</th>
                            <th>Descrição</th>
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