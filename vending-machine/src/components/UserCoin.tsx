import React from 'react';
import { Coin } from '../types/coin';

const UserCoin: React.FC<{ userCoin: Coin }> = ({ userCoin }) => {
  return (
    <>
      <button className="user-coin-btn" value="">
        {userCoin.coin}
      </button>
      <p className="user-coin-count"> {userCoin.count} </p>
    </>
  );
};

export default UserCoin;
