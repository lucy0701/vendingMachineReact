import { useEffect, useState } from 'react';
import axios from '../../axios/axios-config';
import ItemBox from '../components/ItemBox';
import Modal from '../components/Modal';
import UserCoin from '../components/UserCoin';

export default function MachinePage() {
  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => (isOpen ? setIsOpen(false) : setIsOpen(true));

  interface UserCoins {
    coin: string;
    count: number;
  }
  const [userCoins, setUserCoins] = useState<UserCoins[]>([]);

  const getUserCoins = () => {
    axios
      .get('/user-coins')
      .then(res => {
        setUserCoins(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserCoins();
  }, []);

  return (
    <div className="machine-body">
      <div className="body-left">
        <div className="item-display">
          <ItemBox />
        </div>
        <div className="machine-coin">
          <p className="machine-coin-screen">
            <span className="machine-coin-name"> 100 : </span> 20
          </p>
        </div>
      </div>
      <div className="body-rigth">
        <h2>CRYSTAL</h2>
        <div className="total-screen">
          <span className="total-num">0</span>
        </div>
        <button className="ent-coin-btn" onClick={onClickModal}>
          Click
        </button>
        <button className="return-coin-btn">반환</button>
        <div className="get-item-box" />
      </div>
      <Modal name="coin-modal" isOpen={isOpen} onClickModal={onClickModal}>
        {userCoins.map(userCoin => {
          return (
            <UserCoin
              key={userCoin.coin}
              coin={userCoin.coin}
              count={userCoin.count}
            />
          );
        })}
      </Modal>
    </div>
  );
}
