import { Coin } from '../types/coin';
import axios from './axios';

export const readUserCoins = () => axios.get('/user-coins');
export const updateUserCoin = (userCoinId: number, userCoin: Coin) =>
  axios.put(`/user-coins/${userCoinId}`, userCoin);
