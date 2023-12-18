import { Coin } from '../types/coin';

interface ReturnCoinButtonProps {
  totalAmount: number;
  saveTotalAmount: (saveTotalAmount: number) => Promise<void>;
  userCoins: Coin[];
  saveOnlyUserCoin: (saveUserCoin: Coin) => Promise<void>;
  machineCoins: Coin[];
  saveOnlyMachineCoin: (saveMachineCoin: Coin) => Promise<void>;
  insertCoins: Coin[];
  saveOnlyInsertCoin: (saveInsertCoin: Coin) => Promise<void>;
  isPurchased: boolean;
  saveIsPurchased: (saveIsPurchased: boolean) => Promise<void>;
  getUserCoins: () => Promise<void>;
}
const ReturnCoinButton = ({
  totalAmount,
  saveTotalAmount,
  userCoins,
  saveOnlyUserCoin,
  machineCoins,
  saveOnlyMachineCoin,
  insertCoins,
  saveOnlyInsertCoin,
  isPurchased,
  saveIsPurchased,
  getUserCoins,
}: ReturnCoinButtonProps) => {
  const handleReturnBtn = () => {
    let total = totalAmount;

    if (!isPurchased) {
      userCoins.forEach((coin, index) => {
        const userCoin = { ...coin };
        const insertCoin = { ...insertCoins[index] };
        if (insertCoin.count !== 0) {
          total -= Number(insertCoin.coin) * insertCoin.count;
          userCoin.count += insertCoin.count;
          insertCoin.count = 0;
          saveOnlyUserCoin(userCoin);
          saveOnlyInsertCoin(insertCoin);
        } else if (total <= 0) {
          return;
        }
      });
    } else if (isPurchased) {
      let count = 0;

      userCoins.forEach((coin, index) => {
        const userCoin = { ...coin };
        const machineCoin = { ...machineCoins[index] };
        const insertCoin = { ...insertCoins[index] };

        count = Math.floor(total / Number(machineCoin.coin));
        if (insertCoin.count > 0) {
          machineCoin.count += insertCoin.count;
          insertCoin.count = 0;
          saveOnlyInsertCoin(insertCoin);
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
          saveOnlyUserCoin(userCoin);
          saveOnlyMachineCoin(machineCoin);
        } else if (total <= 0) {
          return;
        }
      });
      saveIsPurchased(false);
    }
    getUserCoins();
    saveTotalAmount(total);
  };

  return (
    <button className="return-coin-btn" onClick={handleReturnBtn}>
      반환
    </button>
  );
};
export default ReturnCoinButton;
