import React from 'react'

export default props => {
    let registro = props.registro || { empresa: 0, nome: '', descricao: '', programa: '' }
    return (
        <div>
            <div className="row">
            <div className="col-md-12 text-left">
                    <label htmlFor="empresa">Empresa</label>
                    <input type="number" className="form-control" id="empresa" value={registro.empresa}
                        onChange={(e) => props.onChange(e, 'empresa')}
                        min="1"
                        max="10"
                        required />
                    <div className="invalid-feedback">
                        Informe o código da empresa.
                    </div>
                </div>
                <div className="col-md-12 text-left">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" className="form-control" id="nome" value={registro.nome}
                        placeholder="Nome serviço"
                        onChange={(e) => props.onChange(e, 'nome')}
                        required />
                    <div className="invalid-feedback">
                        Informe um nome.
                    </div>
                </div>
                <div className="col-md-12 text-left">
                    <label htmlFor="programa">Programa</label>
                    <input type="text" className="form-control" id="programa" value={registro.programa}
                        placeholder="Programa"
                        onChange={(e) => props.onChange(e, 'programa')}
                        required />
                    <div className="invalid-feedback">
                        Informe o programa Progress a ser executado.
                    </div>
                </div>
                <div className="col-md-12 text-left">
                    <label htmlFor="nome">Descrição</label>
                    <input type="text" className="form-control" id="nome" value={registro.descricao}
                        placeholder="Descriçao"
                        onChange={(e) => props.onChange(e, 'descricao')} />
                    <div className="invalid-feedback">
                        Informe uma descrição para o serviço.
                    </div>
                </div>
            </div>
            <hr className="mb-4" />
            <div className="row">
                <div className="col-md-6">
                    <button className="btn btn-primary btn-lg btn-block" type="button"
                        onClick={() => props.salvar(registro)}>
                        Salvar
                    </button>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-secondary btn-lg btn-block" onClick={props.cancelar}
                        type="button">Cancelar</button>
                </div>
            </div>
        </div>
    )
}