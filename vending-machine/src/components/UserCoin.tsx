import React from 'react';
import { Coin } from '../types/coin';

interface userCoinProps {
  userCoin: Coin;
  handleDragStart: (e: React.DragEvent) => void;
  handleDragEnd: (e: React.DragEvent) => void;
}

const UserCoin: React.FC<userCoinProps> = ({
  userCoin,
  handleDragStart,
  handleDragEnd,
}) => {
  return (
    <>
      <button
        className="user-coin-btn"
        value={userCoin.coin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        draggable
      >
        {userCoin.coin}
      </button>
      <p className="user-coin-count">
        {userCoin.count}
      </p>
    </>
  );
};

export default UserCoin;
