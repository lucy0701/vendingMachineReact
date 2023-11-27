import { Coin } from '../types/coin';
import axios from './axios';

export const readMachineCoins = () => axios.get('/machine-coins');
export const updateMachineCoin = (machineCoinId: number, saveMachineCoin:Coin ) =>
  axios.put(`/machine-coins/${machineCoinId}`, saveMachineCoin);
