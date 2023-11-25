import React from 'react';
import { Coin } from '../types/coin';

interface UserCoinProps {
  userCoin: Coin;
  insertCoins: Coin[];
  totalAmount: number;
  handleSaveUserCoin: (userCoin: Coin) => void;
  handleSaveInsertCoin: (insertCoins: Coin) => void;
  handleSaveTotalAmount: (totalNum: number) => void;
  handleDragInpoMessage: (message: string) => void;
}

const UserCoin: React.FC<UserCoinProps> = ({
  userCoin,
  insertCoins,
  totalAmount,
  handleSaveUserCoin,
  handleSaveInsertCoin,
  handleSaveTotalAmount,
  handleDragInpoMessage,
}) => {
  const handleDragStart = () => {
    handleDragInpoMessage('여기에요!');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const value = Number(target.getAttribute('value'));
    insertUserCoin(value);

    setTimeout(() => {
      handleDragInpoMessage('');
    }, 1000);
  };

  const insertUserCoin = (value: number) => {
    if (userCoin.count > 0) {
      const updateTotalNum = totalAmount + Number(userCoin.coin);
      const updateUserCoin = userCoin;
      const updateInsertCoin = insertCoins[value];
      updateUserCoin.count - 1;
      updateInsertCoin.count + 1;
      handleSaveTotalAmount(updateTotalNum);
      handleSaveUserCoin(updateUserCoin);
      handleSaveInsertCoin(updateInsertCoin);
    }
  };

  return (
    <>
      <button
        className="user-coin-btn"
        value={userCoin.id}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        draggable
      >
        {userCoin.coin}
      </button>
      <p className="user-coin-count">{userCoin.count}</p>
    </>
  );
};
export default UserCoin;
