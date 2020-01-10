import * as React from 'react';

import Routes from './Routes';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="container">
          <Routes />
        </div>
      </div>
    </BrowserRouter>
  );
}
