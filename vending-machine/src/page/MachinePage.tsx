import { useEffect, useState } from 'react';
import axios from '../services/axios';
import ItemBox from '../components/ItemBox';
import Modal from '../components/Modal';
import UserCoin from '../components/UserCoin';
import { useItems } from '../hooks/useItems';
import { Coin } from '../types/coin';

// TODO: 타입 정리

export default function MachinePage() {
  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => (isOpen ? setIsOpen(false) : setIsOpen(true));

  const { items } = useItems();

  const [userCoins, setUserCoins] = useState<Coin[]>([]);

  useEffect(() => {
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

    getUserCoins();
  }, []);

  const [machineCoins, setMachineCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const getMachineCoins = () => {
      axios
        .get('/user-coins')
        .then(res => {
          setMachineCoins(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getMachineCoins();
  }, []);

  return (
    <div className="machine-body">
      <div className="body-left">
        <div className="item-display">
          {items.map(item => {
            return (
              <ItemBox
                key={item.itemName}
                price={item.price}
                stock={item.stock}
                url={item.url}
                itemName={item.itemName}
              />
            );
          })}
        </div>
        <div className="machine-coin">
          {machineCoins.map(machineCoin => {
            return (
              <p className="machine-coin-screen" key={machineCoin.coin}>
                <span className="machine-coin-name">{machineCoin.coin} :</span>
                {machineCoin.count}
              </p>
            );
          })}
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
      <Modal
        name="coin-modal"
        isOpen={isOpen}
        onClickModal={onClickModal}
        btnClassName="coin-modal-close-btn"
        btnName="CLOSE"
      >
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
