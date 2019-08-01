import React from 'react'
import { Link } from "react-router-dom";

export default props => {
    let list = props.list || []
    let etapas = props.etapas || []

    const renderCards = () => {
        return (
            etapas.map(etapa => {
                let sols = list.filter(sol => {
                    return sol.status.id === etapa.id
                })
                let numSols = sols.length

                return (
                    <div className="row borda" key={etapa.nome}>
                        <Link to="#" className="row link-custom" style={{width:'100%'}}
                            onClick={() => props.detalhar(etapa.name, sols, 'etapa')}>
                            <div className="col-9">
                               <div className="d-flex justify-content-start">{etapa.name}</div>
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