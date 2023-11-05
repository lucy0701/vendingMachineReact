import React, { useEffect, useState } from 'react';
import BodyRigth from '../components/Ui/BodyRigth';
import BodyLeft from '../components/Ui/BodyLeft';
import Modal from '../components/Modal';
import UserCoin from '../components/UserCoin';
import axios from 'axios';

export default function VendingBody() {
  const [userCoins, setUserCoins] = useState([]);
  const getUserCoinsData = () => {
    axios.get(`http://localhost:3001/userCoins`).then(res => {
      setUserCoins(res.data);
    });
  };
  useEffect(() => {
    getUserCoinsData();
  }, []);

  const onClickCoinBtn = e => {
    console.log(e.target.value);
  };

  const [totalAmount, setTotalAmount] = useState([]);
  const getTotalAmountData = () => {
    axios.get(`http://localhost:3001/totalAmount`).then(res => {
      setTotalAmount(res.data);
    });
  };
  useEffect(() => {
    getTotalAmountData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => (isOpen ? setIsOpen(false) : setIsOpen(true));

  return (
    <div className="machine-body">
      <BodyLeft />
      <BodyRigth onClickMadal={onClickModal} totalAmount={totalAmount} />
      <Modal name="coin-modal" isOpen={isOpen} onClickMadal={onClickModal}>
        {userCoins.map(userCoin => {
          return (
            <UserCoin
              key={userCoin.coin}
              coin={userCoin.coin}
              count={userCoin.count}
              onClickCoinBtn={onClickCoinBtn}
            />
          );
        })}
      </Modal>
    </div>
  );
}
