import { useEffect, useState } from 'react';
import axios from '../../axios/axios-config';
import ItemBox from '../components/ItemBox';
import Modal from '../components/Modal';
import UserCoin from '../components/UserCoin';

interface Items {
  itemName: string;
  price: number;
  stock: number;
  url: string;
}
interface UserCoins {
  coin: string;
  count: number;
}
interface MachineCoins {
  coin: string;
  count: number;
}

export default function MachinePage() {
  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => (isOpen ? setIsOpen(false) : setIsOpen(true));

  const [userCoins, setUserCoins] = useState<UserCoins[]>([]);

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

  const [machineCoins, setMachineCoins] = useState<MachineCoins[]>([]);

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

  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    const getItems = () => {
      axios
        .get('/items')
        .then(res => {
          setItems(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getItems();
  }, []);

  const [totalAmount, setTotalAmount] = useState(0);

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
                <span className="machine-coin-name">
                  {machineCoin.coin} :
                </span>
                {machineCoin.count}
              </p>
            );
          })}
        </div>
      </div>
      <div className="body-rigth">
        <h2>CRYSTAL</h2>
        <div className="total-screen">
          <span className="total-num">{totalAmount}</span>
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
