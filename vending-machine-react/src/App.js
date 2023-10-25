import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="title">자판기</h2>
      </header>
      
      <div className="App-body">
        <div className="vending-body">
            <div className="body-left">
              <div className="item-display"></div>
              <div className="machine-coin"></div>
            </div>

            <div className="body-rigth">
              <h2>CRYSTAL</h2>
              <div className="total-screen">
                <span className = "total-num">123</span>
              </div>
              <button className="ent-coin-btn"></button>
              <button className="return-coin-btn"></button>
              <div className="get-item-box"></div>
            </div>

        </div>
      </div>

      <footer className="App-footer">
        <div className="footer-box">
          <button className="footer-btn">아이템</button>
          <button className="footer-btn">관리자</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
