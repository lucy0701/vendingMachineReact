import axios from './axios';

export const readMachineCoins = () => axios.get('/machine-coins');
export const updateMachineCoin = (id: number, updateCount: number) =>
  axios.patch(`/machine-coins/${id}`, { count: updateCount });
