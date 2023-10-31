import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemBox from './ItemBox';

export default function BodyLeft() {
  const [items, setItems] = useState([]);

  const getItemData = () => {
    axios.get(`http://localhost:3001/items`).then(res => {
      setItems(res.data);
    });
  };
  useEffect(() => {
    getItemData();
  }, []);

  const [machineCoins, setMachineCoins] = useState([]);

  const getMachineCoinData = () => {
    axios.get(`http://localhost:3001/machineCoins`).then(res => {
      setMachineCoins(res.data);
    });
  };
  useEffect(() => {
    getMachineCoinData();
  }, []);

  return (
    <div className="body-left">
      <div className="item-display">
        {items.map((item, index) => {
          return (
            <ItemBox
              key={index}
              img={items.url}
              stock={item.stock}
              price={item.price}
            />
          );
        })}
      </div>
      <div className="machine-coin">
        {machineCoins.map((machineCoin, index) => {
          return (
            <p key={index} className="machine-coin-screen">
              <span className="machine-coin-name">{machineCoin.coin} :</span>
              {machineCoin.count}
            </p>
          );
        })}
      </div>
    </div>
  );
}
