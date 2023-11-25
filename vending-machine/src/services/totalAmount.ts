// import { TotalAmount } from '../types/totalAmount';
import axios from './axios';

export const readTotalAmount = () => axios.get('/total-amount');
export const updateTotalAmount = ( saveTotalAmount: number) =>
  axios.post(`/total-amount`, {total:saveTotalAmount});
