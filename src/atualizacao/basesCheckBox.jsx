import React, { Component } from 'react'

import BaseItem from '../common/baseItem'
import Resumo from '../resumo/resumo'

export default class BasesCheckBox extends Component {

    montarList = () => {
        let list = this.props.list || []

        return list.map(base => {
            return (
                <div key={base.nome}>
                    <BaseItem base={base} onClick={this.props.changeItem} />
                </div>
            )
        })
    }

    render = () => {
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <h3><span className="badge badge-secondary">Bases</span></h3>
                    </div>
                </div>
                <div className="d-flex flex-row">
                    <div className="col-6 pr-2">
                        <div className="d-flex flex-wrap">
                            <div className="col-12">
                                {this.montarList()}
                            </div>
                        </div>
                    </div>
                    <div className="col-6 pr-2">
                        <Resumo />
                        <div>
                            <button className="btn btn-primary" onClick={this.props.execute}>Seje Feliz</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}