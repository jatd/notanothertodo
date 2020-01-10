import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AuthProvider from './providers/AuthProvider';
import TodoProvider from './providers/TodosProvider';
import App from './App';
import './App.css';

const RenderApp = () => (
  <AuthProvider>
    <TodoProvider>
      <App />
    </TodoProvider>
  </AuthProvider>
);
ReactDOM.render(<RenderApp />, document.getElementById('root'));
