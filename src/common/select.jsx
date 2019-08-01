import React from 'react'

export default props => {
    
    const setOptions = () => {
        let list = props.list || []
        
        return list.map(obj => (
            <option key={obj[props.chave]}>{obj[props.valor]}</option>
        ))
    }

    return (
        <div className="form-group text-left" style={{ paddingTop: "5px" }}>
            <label>{props.label}</label>
            <select className="form-control" onChange={props.onChange} value={props.default}>
                {setOptions()}
            </select>
        </div>
    )
}