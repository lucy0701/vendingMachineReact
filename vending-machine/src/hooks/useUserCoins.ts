import { useEffect } from 'react';
import { readUserCoins, updateUserCoin } from '../services/userCoin';
import { Coin } from '../types/coin';
import { useRecoilState } from 'recoil';
import { userCoinState } from '../recoil/atoms/containerAtoms/userCoinState';

export const useUserCoins = () => {
  const [userCoins, setUserCoins] = useRecoilState<Coin[]>(userCoinState);

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
    const { id, count } = saveUserCoin;
    try {
      const response = await updateUserCoin(id, count);
      if (response) {
        return getUserCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveUserCoins = async (saveUserCoins: Coin[]) => {
    try {
      const promises = saveUserCoins.map(async (updateCoin) => {
        const { id, count } = updateCoin;
        await updateUserCoin(id, count);
      })
      await Promise.all(promises);
      await getUserCoins();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserCoins();
  }, []);

  return { getUserCoins, userCoins, saveUserCoin, saveUserCoins };
};
