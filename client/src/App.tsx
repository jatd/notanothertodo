import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';

export default function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <Login />} />
          <Route path="/test" render={() => <Login />} />
        </Switch>
      </div>
    </div>
  );
}
