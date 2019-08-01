import React from 'react'

export default props => {
    return (
        <div className="card" style={{ width: "18rem", paddingTop: "5px" }}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
                {props.children}
            </div>
        </div>
    )
}