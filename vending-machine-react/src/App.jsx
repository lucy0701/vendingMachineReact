// import React from 'react';
import React from 'react';

import VendingBody from './app/VendingBody';
import FooterBox from './app/components/Ui/FooterBox';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="title">자판기</h2>
      </header>
      <div className="App-body">
        <VendingBody />
      </div>
      <footer className="App-footer">
        <FooterBox />
      </footer>
    </div>
  );
}

export default App;
