import React from 'react'

const gerarLinhas = () => {
    let fields = this.props.fields || []

    return fields.map(f => {
        return (
            <tr key={f.id}>
                <td>
                    <input type='text' value={f.name} onChange={() => this.props.changeNameF(f)} id={`fname${f.id}`}/>
                </td>
                <td>
                    <input type='text' value={f.type} onChange={() => this.props.changeTypeF(f)} id={`ftype${f.id}`}/>
                </td>
                <td>
                    <button type='button' className='btn btn-danger' onClick={ () => this.removeF(f) }>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        )
    })
}
export default props => {
    return (
        <fieldset>
            <legend>Lengend (não sei o que é)</legend>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {gerarLinhas()}
                </tbody>
            </table>
        </fieldset>
    )
    {
        /*
    <div className="text-left">
        <button className="btn btn-success ml-2" onClick={props.newField}>
            <i className="fa fa-plus"></i>
        </button>
        <ul>
            {gerarLinhas(props)}
        </ul>
    </div>
    */
    }
}