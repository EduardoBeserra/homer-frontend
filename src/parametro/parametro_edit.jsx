import React from 'react'

export default props => {
    let param = props.param || { nome: '', conteudo: '' }
    return (
        <div>
            <div className="row">
                <div className="col-md-12 text-left">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" className="form-control" id="nome" value={param.nome}
                        placeholder="Digite o nome do parâmetro"
                        onChange={props.onChangeNome}
                        required />
                    <div className="invalid-feedback">
                        Informe um nome.
                    </div>
                </div>
                <div className="col-md-12 text-left">
                    <label htmlFor="nome">Conteúdo</label>
                    <input type="text" className="form-control" id="conteudo" value={param.conteudo}
                        placeholder="Digite o conteúdo do parâmetro"
                        onChange={props.onChangeConteudo} />
                </div>
            </div>
            <hr className="mb-4" />
            <div className="row">
                <div className="col-md-6">
                    <button className="btn btn-primary btn-lg btn-block" type="button"
                        onClick={() => props.salvar(param)}>
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