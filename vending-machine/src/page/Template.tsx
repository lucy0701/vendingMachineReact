import { Link, Outlet } from 'react-router-dom';
import Inventory from '../components/Inventory';

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
            Home
          </Link>
          <Inventory/>
          <Link to="/manager" className="footer-btn">
            관리자
          </Link>
        </div>
      </footer>
    </div>
  );
}
