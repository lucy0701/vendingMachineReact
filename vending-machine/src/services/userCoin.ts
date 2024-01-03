// import { Coin } from '../types/coin';
import axios from './axios';

export const readUserCoins = () => axios.get('/user-coins');
export const updateUserCoin = (id: number, updateCount: number) =>
  axios.patch(`/user-coins/${id}`, {count:updateCount});
