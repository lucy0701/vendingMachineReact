// import { useEffect, useState } from 'react';
import { Coin } from '../types/coin';

interface ReturnCoinButtonProps {
  totalAmount: number;
  userCoins: Coin[];
  insertCoins: Coin[];
  machineCoins: Coin[];
  isPurchased: boolean | undefined;
  handleSaveTotalAmount: (updateTotalNum: number) => void;
  handleSaveUserCoin: (userCoin: Coin) => void;
  handleSaveInsertCoin: (insertCoin: Coin) => void;
  handleSaveMachineCoin: (machineCoin: Coin) => void;
  handleUdateIsPurchased: (purchased: boolean) => void;

  // multipleUpdatesCoins: (
  //   userCoin: Coin,
  //   machineCoin: Coin,
  //   insertCoin: Coin,
  // ) => void;
}
const ReturnCoinButton = ({
  userCoins,
  totalAmount,
  insertCoins,
  machineCoins,
  isPurchased,
  handleSaveTotalAmount,
  handleSaveUserCoin,
  handleSaveInsertCoin,
  handleSaveMachineCoin,
  handleUdateIsPurchased, // multipleUpdatesCoins,
}: ReturnCoinButtonProps) => {
  const handleReturnBtn = () => {
    let minusTotal = totalAmount;

    if (!isPurchased) {
      userCoins.forEach((userCoin, index) => {
        const insertCoin = insertCoins[index];
        if (insertCoin.count !== 0) {
          minusTotal -= Number(insertCoin.coin) * insertCoin.count;
          userCoin.count += insertCoin.count;
          insertCoin.count = 0;
          handleSaveUserCoin(userCoin);
          handleSaveInsertCoin(insertCoin);
        } else if (minusTotal <= 0) {
          return;
        }
      });
    } else if (isPurchased) {
      let count = 0;

      userCoins.forEach((userCoin, index) => {
        const machineCoin = machineCoins[index];
        const insertCoin = insertCoins[index];

        count = Math.floor(minusTotal / Number(machineCoin.coin));

        if (insertCoin.count > 0) {
          machineCoin.count += insertCoin.count;
          insertCoin.count = 0;
          handleSaveInsertCoin(insertCoin);
        }
        if (
          minusTotal > 0 &&
          machineCoin.count > 0 &&
          machineCoin.count >= count &&
          count > 0
        ) {
          minusTotal -= count * Number(machineCoin.coin);
          machineCoin.count -= count;
          userCoin.count += count;

          handleSaveUserCoin(userCoin);
          handleSaveMachineCoin(machineCoin);
          // multipleUpdatesCoins(userCoin, machineCoin, insertCoin);
        } else if (minusTotal <= 0) {
          return;
        }
      });
      handleUdateIsPurchased(false);
    }
    handleSaveTotalAmount(minusTotal);
  };

  const onClickReturnBtn = () => {
    handleReturnBtn();
  };

  return (
    <button className="return-coin-btn" onClick={onClickReturnBtn}>
      반환
    </button>
  );
};
export default ReturnCoinButton;
