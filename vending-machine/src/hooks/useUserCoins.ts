import { useEffect, useState } from 'react';
import {
  readUserCoins,
  updateUserCoin,
} from '../services/userCoin';
import { Coin } from '../types/coin';

export const useUserCoins = () => {
  const [userCoins, setUserCoins] = useState<Coin[]>([]);

  const getUserCoins = async () => {
    try {
      const response = await readUserCoins();

      if (response) {
        setUserCoins(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveUserCoin = async (saveUserCoin: Coin) => {
    const { id } = saveUserCoin;
    try {
      const response = await updateUserCoin(id, saveUserCoin);
      if (response) {
        return getUserCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCoins();
  }, []);

  return {
    userCoins,
    saveUserCoin,
  };
};
