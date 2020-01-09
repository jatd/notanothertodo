import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Login />} />
      <Route path="/todos" render={() => <div>todos</div>} />
    </Switch>
  );
}
