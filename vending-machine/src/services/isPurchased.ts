import axios from './axios';

export const readIsPurchased = () => axios.get('/is-purchased');
export const updateIsPurchased = (savePurchased:boolean) =>
  axios.put(`/is-purchased/`, {purchased:savePurchased});
