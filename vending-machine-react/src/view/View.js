import PropTypes from 'prop-types';

function RenderItem({ item, index }) {
  return (
    <div className="item-box">
      <div className="item-image">
        <p className="sold-out">sold out</p>
        <div className="item-price">{item.price}</div>
        <div className="item-stock">{item.stock}</div>
        <img className="item-img-print" src={item.image} alt={item.itemName} />
      </div>
      <button className="buy-btn" data-index={index}>
        고백 박기
      </button>
    </div>
  );
}
function RenderMachineCoin({ coin, count }) {
  return (
    <p className="machine-coin-screen">
      <span className="machine-coin-name">{coin} :</span> {count}
    </p>
  );
}

function RenderUserCoin({ coin, count }) {
  return (
    <>
      <button className="user-coin-btn">{coin}</button>
      <p className="user-coin-count">{count}</p>
    </>
  );
}

export default function View({ viewModel }) {
  const items = viewModel.getItems();
  const totalAmount = viewModel.getTotalAmount();
  const userCoins = viewModel.getUserCoins();
  const machineCoins = viewModel.getMachineCoins();
  // const myItems = viewModel.getMyItems();

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="title">자판기</h2>
      </header>

      <div className="App-body">
        <div className="vending-body">
          <div className="body-left">
            <div className="item-display">
              {items.map((item, index) => (
                <RenderItem key={index} item={item} index={index} />
              ))}
            </div>
            <div className="machine-coin">
              {Object.entries(machineCoins).map(([coin, count]) => (
                <RenderMachineCoin key={coin} coin={coin} count={count} />
              ))}
            </div>
          </div>

          <div className="body-rigth">
            <h2>CRYSTAL</h2>
            <div className="total-screen">
              <span className="total-num">{totalAmount}</span>
            </div>
            <button className="ent-coin-btn">Click</button>
            <button className="return-coin-btn">반환</button>
            <div className="get-item-box" />
          </div>

          <div className="coin-modal">
            {Object.entries(userCoins).map(([coin, count]) => (
              <RenderUserCoin key={coin} coin={coin} count={count} />
            ))}
          </div>
        </div>
      </div>

      <footer className="App-footer">
        <div className="footer-box">
          <button className="footer-btn">아이템</button>
          <div className="inventory" />
          <button className="footer-btn">관리자</button>
        </div>
      </footer>
    </div>
  );
}

View.propTypes = {
  viewModel: PropTypes.shape({
    getItems: PropTypes.func.isRequired,
    getTotalAmount: PropTypes.func.isRequired,
    getUserCoins: PropTypes.func.isRequired,
    getMachineCoins: PropTypes.func.isRequired,
    getMyItems: PropTypes.func.isRequired,
  }).isRequired,
};

RenderItem.propTypes = {
  item: PropTypes.shape({
    itemName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

RenderMachineCoin.propTypes = {
  machineCoins: PropTypes.object.isRequired,
  coin: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

RenderUserCoin.propTypes = {
  userCoins: PropTypes.object.isRequired,
  coin: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
