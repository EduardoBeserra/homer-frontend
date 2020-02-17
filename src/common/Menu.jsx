import React from 'react'
import { Link } from "react-router-dom";
import homerImage from '../img/homer1.png'

export default () => 
    <div className="menu-area">
        <div className="menu-logo">
            <img src={homerImage} alt="Homer" />
        </div>
        <div className="menu-itens">
            <ul>
                <li><Link className="menu-item" to="diferenca">Diferença DFs</Link></li>
                <li><Link className="menu-item" to="compararbases">Atualização</Link></li>
                <li><Link className="menu-item" to="getarquivo">Arquivos</Link></li>
                <li><Link className="menu-item" to="parametros">Configurações</Link></li>
                <li><Link className="menu-item" to="about">Sobre</Link></li>
                <li><Link className="menu-item" to="int003">Int003</Link></li>
            </ul>
        </div>
    </div>
