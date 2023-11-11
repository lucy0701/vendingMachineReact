import { useEffect, useState } from 'react';
import {
  readInsertCoins,
  createInsertCoin,
  saveInsertCoin,
  deleteInsertCoin,
} from '../services/insertCoin';
import { Coin } from '../types/coin';

export const useInsertCoins = () => {
  const [insertCoins, setInsertCoins] = useState<Coin[]>([]);

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

  const updateInsertCoin = async (updateInsertCoin: Coin) => {
    const { coin } = updateInsertCoin;
    try {
      const response = await saveInsertCoin(coin);
      if (response) {
        return getInsertCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeInsertCoin = async (removeInsertCoin: Coin) => {
    const { coin } = removeInsertCoin;
    try {
      const response = await deleteInsertCoin(coin);
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
    insertCoins,
    addInsertCoin,
    updateInsertCoin,
    removeInsertCoin,
  };
};
