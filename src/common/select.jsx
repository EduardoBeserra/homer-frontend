import React from 'react'

export default props => {
    
    const setOptions = () => {
        let list = props.list || []
        list = list.sort((b1 , b2) => b1.name > b2.name ? 1 : -1)
        
        return list.map(obj => (
            <option key={obj[props.chave]}>{obj[props.valor]}</option>
        ))
    }

    return (
        <select onChange={props.onChange} value={props.default} className={props.className}>
            {setOptions()}
        </select>
    )
}