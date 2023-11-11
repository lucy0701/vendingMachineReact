import axios from './axios';

export const readTotalAmount = () => axios.get('/totalAmount');
export const saveTotalAmount = (total: number) =>
  axios.put(`/totalAmount`, total);

