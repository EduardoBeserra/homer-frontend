import React from 'react'

const gerarLinhas = props => {
    let fields = props.fields || []

    return fields.map(f => {
        return (
            <tr key={f.id}>
                <td>
                    <input type='text' value={f.name} onChange={(e) => props.changeField(f, e, 'nameF')}
                        className='form-control'
                        id={`fname${f.id}`}/>
                </td>
                <td>
                    <input type='text' value={f.type} onChange={(e) => props.changeField(f, e, 'typeF')}
                        className='form-control'
                        id={`ftype${f.id}`}/>
                </td>
                <td>
                    <button type='button' className='btn btn-danger' onClick={ () => props.removeF(f) }>
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
            <legend>Campos</legend>
            <div className="text-left">
                <button className="btn btn-success ml-2" onClick={props.newField}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {gerarLinhas(props)}
                </tbody>
            </table>
        </fieldset>
    )
}