import React from 'react'
import { Link } from "react-router-dom";

export default props => {

    const renderCards = () => {
        let list = props.list || []
        let usuarios = props.usuarios || []
        usuarios = usuarios.sort((u1 ,u2) => {
            if(!u1.name) return 1
            if(!u2.name) return -1
            if (u1.name === u2.name)
                return 0
            return u1.name > u2.name ? 1 : -1
        })

        return (
            usuarios.map(usuario => {
                let sols = list.filter(sol => {
                    if(usuario.id) {
                        let u = sol.assigned_to
                        if(u)
                            return u.id === usuario.id
                        else
                            return false
                    } else
                        return !sol.assigned_to
                })
                let numSols = sols.length
    
                return (
                    <div className="row borda" key={usuario.name}>
                        <Link to="#" className="row link-custom" style={{width:'100%'}}
                            onClick={() => props.detalhar(usuario.name, sols, 'usuario')}>
                            <div className="col-9">
                               <div className="d-flex justify-content-start">{usuario.name}</div>
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