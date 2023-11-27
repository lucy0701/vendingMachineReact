import { Coin } from '../types/coin';
import axios from './axios';

export const readInsertCoins = () => axios.get('/insert-coins');
export const createInsertCoin = (addInsertCoin: Coin) =>
  axios.post('/insert-coins', addInsertCoin);
export const updateInsertCoin = (insertCoinId: number, saveInsertCoin: Coin) =>
  axios.put(`/insert-coins/${insertCoinId}`, saveInsertCoin);
export const deleteInsertCoin = (
  insertCoinId: number,
  removeInsertCoin: Coin,
) => axios.delete(`/insert-coins/${insertCoinId}`, { data: removeInsertCoin });
