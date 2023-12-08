import { Coin } from '../types/coin';

interface ReturnCoinButtonProps {
  totalAmount: number;
  saveTotalAmount: (saveTotalAmount: number) => Promise<void>;
  userCoins: Coin[];
  saveUserCoins: (saveUserCoin: Coin[]) => Promise<void>;
  machineCoins: Coin[];
  saveMachineCoins: (saveMachineCoin: Coin[]) => Promise<void>;
  insertCoins: Coin[];
  saveInsertCoins: (saveInsertCoin: Coin[]) => Promise<void>;
  isPurchased: boolean;
  saveIsPurchased: (saveIsPurchased: boolean) => Promise<void>;
}
const ReturnCoinButton = ({
  totalAmount,
  saveTotalAmount,
  userCoins,
  saveUserCoins,
  machineCoins,
  saveMachineCoins,
  insertCoins,
  saveInsertCoins,
  isPurchased,
  saveIsPurchased,
}: ReturnCoinButtonProps) => {
  const handleReturnBtn = () => {
    let total = totalAmount;
    const updateUserCoins: Coin[] = [];
    const updateInsertCoins: Coin[] = [];
    const updateMachineCoins: Coin[] = [];

    if (!isPurchased) {
      userCoins.forEach((coin, index) => {
        const userCoin = { ...coin };
        const insertCoin = { ...insertCoins[index] };

        if (insertCoin.count !== 0) {
          total -= Number(insertCoin.coin) * insertCoin.count;
          userCoin.count += insertCoin.count;
          insertCoin.count = 0;
          updateUserCoins.push(userCoin);
          updateInsertCoins.push(insertCoin);
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
          updateInsertCoins.push(insertCoin);
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
          updateUserCoins.push(userCoin);
          updateMachineCoins.push(machineCoin);
        } else if (total <= 0) {
          return;
        }
      });
      saveIsPurchased(false);
    }
    saveUserCoins(updateUserCoins);
    saveMachineCoins(updateMachineCoins);
    saveInsertCoins(updateInsertCoins);
    saveTotalAmount(total);
  };

  return (
    <button className="return-coin-btn" onClick={handleReturnBtn}>
      반환
    </button>
  );
};
export default ReturnCoinButton;
