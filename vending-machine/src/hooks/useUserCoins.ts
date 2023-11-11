import { useEffect, useState } from 'react';
import {
  readUserCoins,
  createUserCoin,
  saveUserCoin,
  deleteUserCoin,
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

  const addUserCoin = async (addUserCoin: Coin) => {
    try {
      const response = await createUserCoin(addUserCoin);
      if (response) {
        return getUserCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserCoin = async (updateUserCoin: Coin) => {
    const { coin } = updateUserCoin;
    try {
      const response = await saveUserCoin(coin);
      if (response) {
        return getUserCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeUserCoin = async (removeUserCoin: Coin) => {
    const { coin } = removeUserCoin;
    try {
      const response = await deleteUserCoin(coin);
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
    addUserCoin,
    updateUserCoin,
    removeUserCoin,
  };
};
