import { Coin } from '../types/coin';

interface ReturnCoinButtonProps {
  totalAmount: number;
  saveTotalAmount: (saveTotalAmount: number) => Promise<void>;
  userCoins: Coin[];
  saveUserCoin: (saveUserCoin: Coin) => Promise<void>;
  machineCoins: Coin[];
  saveMachineCoin: (saveMachineCoin: Coin) => Promise<void>;
  insertCoins: Coin[];
  saveInsertCoin: (saveInsertCoin: Coin) => Promise<void>;
  isPurchased: boolean;
  saveIsPurchased: (saveIsPurchased: boolean) => Promise<void>;
}
const ReturnCoinButton = ({
  totalAmount,
  saveTotalAmount,
  userCoins,
  saveUserCoin,
  machineCoins,
  saveMachineCoin,
  insertCoins,
  saveInsertCoin,
  isPurchased,
  saveIsPurchased,
}: ReturnCoinButtonProps) => {
  const handleReturnBtn = () => {
    let total = totalAmount;
    const updateUserCoins: Coin[] = JSON.parse(JSON.stringify(userCoins));

    if (!isPurchased) {
      updateUserCoins.forEach((userCoin, index) => {
        const insertCoin = { ...insertCoins[index] };

        if (insertCoin.count !== 0) {
          total -= Number(insertCoin.coin) * insertCoin.count;
          userCoin.count += insertCoin.count;
          insertCoin.count = 0;
          saveUserCoin(userCoin);
          saveInsertCoin(insertCoin);
        } else if (total <= 0) {
          return;
        }
      });
    } else if (isPurchased) {
      let count = 0;

      updateUserCoins.forEach((userCoin, index) => {
        const machineCoin = { ...machineCoins[index] };
        const insertCoin = { ...insertCoins[index] };

        count = Math.floor(total / Number(machineCoin.coin));

        if (insertCoin.count > 0) {
          machineCoin.count += insertCoin.count;
          insertCoin.count = 0;
          saveInsertCoin(insertCoin);
        }
        if (
          total > 0 &&
          machineCoin.count > 0 &&
          machineCoin.count >= count &&
          count > 0
        ) {
          total -= count * Number(machineCoin.coin);
          machineCoin.count -= count;
          userCoin.count += count;

          saveUserCoin(userCoin);
          saveMachineCoin(machineCoin);
        } else if (total <= 0) {
          return;
        }
      });
      saveIsPurchased(false);
    }
    saveTotalAmount(total);
  };

  return (
    <button className="return-coin-btn" onClick={handleReturnBtn}>
      반환
    </button>
  );
};
export default ReturnCoinButton;
