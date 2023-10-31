import React, { useEffect, useState } from 'react';
import BodyRigth from './components/Ui/BodyRigth';
import BodyLeft from './components/Ui/BodyLeft';
import Modal from './components/Modal';
import UserCoin from './components/UserCoin';
import axios from 'axios';


export default function VendingBody() {
  const [userCoins, setUserCoins] = useState([]);
  const getUserCoinsData = () => {
    axios.get(`http://localhost:3001/userCoins`).then((res)=>{
      setUserCoins(res.data);
    })
  }
  useEffect(() => {
    getUserCoinsData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const onClickMadal = () => isOpen ? setIsOpen(false) : setIsOpen(true);


  return (
    <div className="vending-body">
      <BodyLeft />
      <BodyRigth onClickMadal={onClickMadal} />
      <Modal name = "coin-modal" isOpen={isOpen} onClickMadal={onClickMadal}>
        {userCoins.map(userCoin => {
          return (
            <UserCoin key={userCoin.coin} coin={userCoin.coin} count={userCoin.count}  />
          )
        })}
      </Modal>
    </div>
  );
}
