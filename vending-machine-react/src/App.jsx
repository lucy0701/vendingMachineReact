import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ManagerPage from './app/page/ManagerPage';
import VendingBody from './app/page/VendingBody';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2 className="title">자판기</h2>
        </header>
        <div className="App-body">
          <div className="App-page">
            <Routes>
              <Route path="/" element={<VendingBody />} />
              <Route path="/manager" element={<ManagerPage />} />
            </Routes>
          </div>
        </div>
        <footer className="App-footer">
          <div className="footer-box">
            <Link to="/" className="footer-btn">
              홈
            </Link>
            <div className="inventory" />
            <Link to="/manager" className="footer-btn">
              관리자
            </Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
