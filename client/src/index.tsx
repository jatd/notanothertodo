import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import App from './App';
import './App.css';

const RenderApp = () => (
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
ReactDOM.render(<RenderApp />, document.getElementById('root'));
