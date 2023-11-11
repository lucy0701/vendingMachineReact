import { Coin } from '../types/coin';
import axios from './axios';

export const readUserCoins = () => axios.get('/user-coins');
export const createUserCoin = (addUserCoin: Coin) =>
  axios.post('/user-coin', addUserCoin);
export const saveUserCoin = (userCoinName: string) =>
  axios.put(`/user-coin/${userCoinName}`);
export const deleteUserCoin = (userCoinName: string) =>
  axios.delete(`/user-coin/${userCoinName}`);
