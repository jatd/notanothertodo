import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';

const RenderApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
ReactDOM.render(<RenderApp />, document.getElementById('root'));
