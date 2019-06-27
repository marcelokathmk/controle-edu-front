import React from 'react';
import Escola from './escola/Escola';
import Turma from './turma/Turma';
import { Switch, Route } from 'react-router-dom'

export default props => (
    <Switch>
        <Route path="/escola" component={Escola} />
        <Route path="/turma" component={Turma} />
        <Route path="/*" exact={true} component={Escola} />
    </Switch>
)