import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Template() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="title">자판기</h2>
      </header>
      <div className="App-body">
        <div className="App-page">
          <Outlet />
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
  );
}
