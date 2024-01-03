import { useEffect } from 'react';
import {
  readInsertCoins,
  updateInsertCoin,
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

  const saveInsertCoin = async (saveInsertCoin: Coin) => {
    const { id, count } = saveInsertCoin;
    try {
      const response = await updateInsertCoin(id, count);
      if (response) {
        return getInsertCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const saveOnlyInsertCoin = async (saveInsertCoin: Coin) => {
    const { id, count } = saveInsertCoin;
    try {
      const response = await updateInsertCoin(id, count);
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const saveInsertCoins = async (saveInsertCoins: Coin[]) => {
  //   try {
  //     const promises = saveInsertCoins.map(async (updateCoin) => {
  //       const { id, count } = updateCoin;
  //       await updateInsertCoin(id, count);
  //     })
  //     await Promise.all(promises);
  //     await getInsertCoins();

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getInsertCoins();
  }, []);

  return {
    getInsertCoins,
    insertCoins,
    saveInsertCoin,
    saveOnlyInsertCoin
  };
};
