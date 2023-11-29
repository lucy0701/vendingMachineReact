import { useUserCoins } from '../hooks/useUserCoins';
import { useInsertCoins } from '../hooks/useInsertCoins';
import { useTotalAmount } from '../hooks/useTotalAmount';
import { useMachineCoins } from '../hooks/useMachineCoins';
import { Coin } from '../types/coin';
import { useIsPurchased } from '../hooks/useIsPurchased';

const ReturnCoinButton = () => {
  const { userCoins, saveUserCoin } = useUserCoins();
  const { insertCoins, saveInsertCoin } = useInsertCoins();
  const { totalAmount, saveTotalAmount } = useTotalAmount();
  const { machineCoins, saveMachineCoin } = useMachineCoins();
  const { isPurchased, saveIsPurchased } = useIsPurchased();

  const handleReturnBtn = () => {
    let minusTotal = totalAmount;
    const updateUserCoins: Coin[] = JSON.parse(JSON.stringify(userCoins));
    if (!isPurchased) {
      updateUserCoins.forEach((userCoin, index) => {
        const insertCoin = { ...insertCoins[index] };

        if (insertCoin.count !== 0) {
          minusTotal -= Number(insertCoin.coin) * insertCoin.count;
          userCoin.count += insertCoin.count;
          insertCoin.count = 0;
          saveUserCoin(userCoin);
          saveInsertCoin(insertCoin);
        } else if (minusTotal <= 0) {
          return;
        }
      });
    } else if (isPurchased) {
      let count = 0;

      updateUserCoins.forEach((userCoin, index) => {
        const machineCoin = { ...machineCoins[index] };
        const insertCoin = { ...insertCoins[index] };

        count = Math.floor(minusTotal / Number(machineCoin.coin));

        if (insertCoin.count > 0) {
          machineCoin.count += insertCoin.count;
          insertCoin.count = 0;
          saveInsertCoin(insertCoin);
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

          saveUserCoin(userCoin);
          saveMachineCoin(machineCoin);
        } else if (minusTotal <= 0) {
          return;
        }
      });
      saveIsPurchased(false);
    }
    saveTotalAmount(minusTotal);
  };

  return (
    <button className="return-coin-btn" onClick={handleReturnBtn}>
      반환
    </button>
  );
};
export default ReturnCoinButton;
