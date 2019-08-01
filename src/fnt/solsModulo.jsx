import React from 'react'
import { Link } from "react-router-dom";
import { getModulo } from "./moduloUtil";

export default props => {

    /*
    const getModulo = sol => {
        let cfModulo = []
        if(sol.custom_fields) {
            cfModulo = sol.custom_fields.filter(cf => {
                return cf.id === 72
            })
        }
        if(cfModulo.length > 0)
            return cfModulo[0].value
        return ''
    }
    */

    const renderCards = () => {
        let list = props.list || []
        let modulos = props.modulos || []
        modulos = modulos.sort((m1 ,m2) => {
            if(!m1.name) return 1
            if(!m2.name) return -1
            if (m1.name === m2.name)
                return 0
            return m1.name > m2.name ? 1 : -1
        })

        return (
            modulos.map(modulo => {
                let sols = list.filter(sol => {
                    if(modulo.id) {
                        let id_modulo = getModulo(sol)
                        if(id_modulo)
                            return id_modulo === modulo.id
                        else
                            return false
                    } else
                        return !getModulo(sol)
                })
                let numSols = sols.length
    
                return (
                    <div className="row borda" key={modulo.name}>
                        <Link to="#" className="row link-custom" style={{width:'100%'}}
                            onClick={() => props.detalhar(modulo.name, sols, 'modulo')}>
                            <div className="col-9">
                               <div className="d-flex justify-content-start">{modulo.name}</div>
                            </div>
                            <div className="col-3">
                                <span className="badge badge-primary badge-pill">
                                    {numSols}
                                </span>
                            </div>
                        </Link>
                    </div>
                )
            })
        )
    }

    return (
        <div className="container">
            <div className="list-group">
                {renderCards()}
            </div>
        </div>
    )
}