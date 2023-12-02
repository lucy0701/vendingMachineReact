import React from 'react';
import { Coin } from '../types/coin';
import { useUserCoins } from '../hooks/useUserCoins';
import { useInsertCoins } from '../hooks/useInsertCoins';
import { useTotalAmount } from '../hooks/useTotalAmount';
import {
  dragInpoMessageState,
  isDropFieldState,
} from '../recoil/atoms/presentationAtoms/dragAndDropSate';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface UserCoinProps {
  userCoin: Coin;
}

const UserCoin: React.FC<UserCoinProps> = ({ userCoin }) => {
  const { saveUserCoin } = useUserCoins();
  const { insertCoins, saveInsertCoin } = useInsertCoins();
  const { totalAmount, saveTotalAmount } = useTotalAmount();

  const setDragInpoMessage = useSetRecoilState(dragInpoMessageState);
  const [isDropField, setIsDropField] =
    useRecoilState<boolean>(isDropFieldState);

  const handleDragStart = () => {
    setDragInpoMessage('여기에요!');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const value = Number(target.getAttribute('value'));
    if (isDropField) {
      insertUserCoin(value);
      setIsDropField(false);
    }
    setTimeout(() => {
      setDragInpoMessage('');
    }, 1000);
  };

  const insertUserCoin = (value: number) => {
    if (userCoin.count > 0) {
      const updateTotalNum = totalAmount + Number(userCoin.coin);
      const updateUserCoin = { ...userCoin };
      const updateInsertCoin = { ...insertCoins[value] };
      updateUserCoin.count -= 1;
      updateInsertCoin.count += 1;
      saveTotalAmount(updateTotalNum);
      saveUserCoin(updateUserCoin);
      saveInsertCoin(updateInsertCoin);
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
