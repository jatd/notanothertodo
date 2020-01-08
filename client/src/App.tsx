import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

const Login = () => <div> Login </div>;
const ToDos = () => <div> ToDos </div>;

const App = () => (
  <Switch>
    <Route exact path="/" render={() => <ToDos />} />
    <Route path="/test" render={() => <Login />} />
  </Switch>
);

export default App;
