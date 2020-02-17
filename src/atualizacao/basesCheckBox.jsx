import React, { Component } from 'react'

import BaseItem from '../common/baseItem'

export default class BasesCheckBox extends Component {

    render = () => {
        let list = this.props.list.sort((b1 , b2) => b1.name > b2.name ? 1 : -1)
        return (
            <ul className="lista-bases">
                {list.map(base => {
                    return <li key={base.name}><BaseItem base={base} onClick={this.props.changeItem} /></li>
                }
                )}
            </ul>
        )
    }
}