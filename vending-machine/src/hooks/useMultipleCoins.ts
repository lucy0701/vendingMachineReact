import { useMachineCoins } from '../hooks/useMachineCoins';
import { useUserCoins } from '../hooks/useUserCoins';
import { useInsertCoins } from '../hooks/useInsertCoins';

import { Coin } from '../types/coin';
import axios from 'axios';

export const useMultipleCoins = () => {
  const { saveUserCoin } = useUserCoins();
  const { saveInsertCoin } = useInsertCoins();
  const { saveMachineCoin } = useMachineCoins();

  const multipleUpdatesCoins = async (
    userCoin: Coin,
    machineCoin: Coin,
    insertCoin: Coin,
  ) => {
    try {
      await axios.all([
        saveUserCoin(userCoin),
        saveMachineCoin(machineCoin),
        saveInsertCoin(insertCoin),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    multipleUpdatesCoins,
  };
};
