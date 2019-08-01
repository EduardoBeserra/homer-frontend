import React, { Component } from 'react'

//import Fields from './fields'
const gerador = require('./gerador')

export default class Gerador extends Component {
    constructor (props) {
        super(props)
        this.state = {
            config: {
                table: {
                    name: '',
                    description: '',
                    fields: [],
                    index: []
                },
            }
        }
    }

    change = (e, campo) => {
        let {config} = this.state
        switch(campo) {
            case 'name_table':
                config.table.name = e.target.value
                break
            case 'desc_table':
                config.table.description = e.target.value
                break
        }
        this.setState({...this.state, config})
    }

    newField = () => {
        let {config} = this.state
        let id = config.table.fields.length
        let f = {
            id,
            name: '',
            type: ''
        }
        config.table.fields.push(f)

        this.setState({...this.state, config})
    }

    render() {
        let {name, description} = this.state.config.table
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 left">
                        <label>Nome</label>
                        <input type="text" value={name} onChange={(e) => this.change(e, 'name_table')} 
                            className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 left">
                        <label>Descrição</label>
                        <input type="text" value={description} onChange={(e) => this.change(e, 'desc_table')} 
                            className="form-control"/>
                    </div>
                </div>
                <br />
                
            </div>
        )
        /*<Fields newField={this.newField} fields={this.state.config.table.fields}/>*/
    }
}