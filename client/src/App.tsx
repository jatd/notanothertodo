import * as React from 'react';

import Routes from './Routes';
import Header from './components/Header';

export default function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes />
      </div>
    </div>
  );
}
