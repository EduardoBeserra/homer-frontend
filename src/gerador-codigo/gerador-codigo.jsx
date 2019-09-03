import React, { Component } from 'react'

import Fields from './fields'
//const gerador = require('./gerador')

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
        this.removeField = this.removeField.bind(this)
        
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
            default:
                break
        }
        this.setState({...this.state, config})
    }

    changeField = (field, evt, campo) => {
        let {config} = this.state
        let {fields} = config.table
        let novoField = fields.filter(f => {
            return f.id === field.id
        })[0]
        switch(campo) {
            case 'nameF':
                novoField.name = evt.target.value
                break
            case 'typeF':
                novoField.type = evt.target.value
                break
            default:
                break
        }
        config.table.fields = this.atualizarField(fields, novoField)
        this.setState({ ...this.state, config })
    }

    atualizarField = (fields, field) => {
        let list = fields.map(f => {
            return f.id === field.id ? field : f
        })
        return list
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

    removeField = (f) => {
        let {config} = this.state
        let {fields} = config.table
        fields = fields.filter(field => {
            return field.id !== f.id
        })
        config.table.fields = fields

        this.setState({ ...this.state, config })
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
                <Fields newField={this.newField} fields={this.state.config.table.fields}
                    removeF={this.removeField}
                    changeField={this.changeField} />
            </div>
        )
    }
}