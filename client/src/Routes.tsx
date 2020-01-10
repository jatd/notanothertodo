import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Todos from './components/Todos';
import { AuthContext } from './providers/AuthProvider';

export default function Routes() {
  const { isLoggedIn } = React.useContext(AuthContext);
  return (
    <Switch>
      <Route
        path="/login"
        render={() => (!isLoggedIn() ? <Login /> : <Redirect to="/" />)}
      />
      <Route
        path="/todos"
        render={() => (isLoggedIn() ? <Todos /> : <Redirect to="/login" />)}
      />
      <Route
        exact
        path="/"
        render={() =>
          isLoggedIn() ? <Redirect to="/todos" /> : <Redirect to="/login" />
        }
      />
    </Switch>
  );
}
