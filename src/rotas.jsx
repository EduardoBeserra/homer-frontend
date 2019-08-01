import React from 'react'
import { Switch, Route, Redirect } from "react-router";

import Parametro from './parametro/parametro'
import Diferenca from './diferenca/diferenca'
import Sobre from './sobre/sobre'
import GetArquivo from './get_arquivo/getarquivo'
import CompararBases from './atualizacao/compararBases'
import Solicitacoes from "./fnt/solicitacoes"
import SolsEtapa from './fnt/solsEtapa'
import Gerador from './gerador-codigo/gerador-codigo'

export default props => (
    <div className="content-wrapper">
        <Switch>
            <Route exact path='/' component={Diferenca} />
            <Route path='/parametros' component={Parametro} />
            <Route path='/about' component={Sobre} />
            <Route path='/getarquivo' component={GetArquivo} />
            <Route path='/compararbases' component={CompararBases} />
            <Route path='/fnt' component={Solicitacoes} />
            <Route path='solsEtapa' component={SolsEtapa} />
            <Route path='/geradorcodigo' component={Gerador} />

            <Redirect from="*" to="/" />
        </Switch>
    </div>
)