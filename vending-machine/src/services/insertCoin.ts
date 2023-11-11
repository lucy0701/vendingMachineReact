import { Coin } from '../types/coin';
import axios from './axios';

export const readInsertCoins = () => axios.get('/insert-coin');
export const createInsertCoin = (addInsertCoin: Coin) =>
  axios.post('/insert-coin', addInsertCoin);
export const saveInsertCoin = (insertCoinId: string) =>
  axios.put(`/insert-coin/${insertCoinId}`);
export const deleteInsertCoin = (insertCoinId: string) =>
  axios.delete(`/insert-coin/${insertCoinId}`);
