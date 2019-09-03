import React from 'react'
import { Link } from "react-router-dom";
import homerImage from '../img/homer1.png'

export default props => (
    <header className="navbar navbar-expand bg-secundary flex-column flex-md-row bd-navbar">
        <div className="navbar-nav-scroll">
            <ul className="navbar-nav bd-navbar-nav flex-row">
                <li className="nav-item">
                    <Link className="nav-link" to="diferenca">Homer</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="compararbases">Atualização</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="getarquivo">Arquivos</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="parametros">Configurações</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="about">Sobre</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="fnt">Solicitações</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="geradorcodigo">Gerador Código</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="graficos">Gráficos</Link>
                </li>
            </ul>
        </div>
        <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
            <li className="nav-item">
                <div className="row">
                    <div className="col-md-12">
                        <img src={homerImage} style={{width:"200px", height:"150px"}} className="img-fluid thumbnail"
                        alt="Homer" />
                    </div>
                </div>
            </li>
        </ul>
        
    </header>
)