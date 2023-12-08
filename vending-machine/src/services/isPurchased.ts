import axios from './axios';

export const readIsPurchased = () => axios.get('/is-purchased');
export const updateIsPurchased = (savePurchased:boolean) =>
  axios.patch(`/is-purchased/`, {purchased:savePurchased});
