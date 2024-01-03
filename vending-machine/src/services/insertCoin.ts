import axios from './axios';

export const readInsertCoins = () => axios.get('/insert-coins');
export const updateInsertCoin = (id: number, updateCount: number) =>
  axios.patch(`/insert-coins/${id}`, { count: updateCount });
