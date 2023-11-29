import { useEffect } from 'react';
import {
  readInsertCoins,
  createInsertCoin,
  updateInsertCoin,
  deleteInsertCoin,
} from '../services/insertCoin';
import { Coin } from '../types/coin';
import { useRecoilState } from 'recoil';
import { insertCoinState } from '../recoil/atoms/containerAtoms/insertCoinState';

export const useInsertCoins = () => {
  const [insertCoins, setInsertCoins] = useRecoilState<Coin[]>(insertCoinState);

  const getInsertCoins = async () => {
    try {
      const response = await readInsertCoins();

      if (response) {
        setInsertCoins(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addInsertCoin = async (addInsertCoin: Coin) => {
    try {
      const response = await createInsertCoin(addInsertCoin);
      if (response) {
        return getInsertCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveInsertCoin = async (saveInsertCoin: Coin) => {
    const { id } = saveInsertCoin;
    try {
      const response = await updateInsertCoin(id, saveInsertCoin);
      if (response) {
        return getInsertCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeInsertCoin = async (removeInsertCoin: Coin) => {
    const { id } = removeInsertCoin;
    try {
      const response = await deleteInsertCoin(id, removeInsertCoin);
      if (response) {
        return getInsertCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInsertCoins();
  }, []);

  return {
    getInsertCoins,
    insertCoins,
    addInsertCoin,
    saveInsertCoin,
    removeInsertCoin,
  };
};
