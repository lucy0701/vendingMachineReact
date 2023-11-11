import { Coin } from '../types/coin';
import axios from './axios';

export const readMachineCoins = () => axios.get('/machine-coins');
export const createMachineCoin = (addMachineCoin: Coin) =>
  axios.post('/machine-coin', addMachineCoin);
export const saveMachineCoin = (machineCoinName: string) =>
  axios.put(`/machine-coin/${machineCoinName}`);
export const deleteMachineCoin = (machineCoinName: string) =>
  axios.delete(`/machine-coin/${machineCoinName}`);
