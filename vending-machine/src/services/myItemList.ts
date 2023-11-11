import { Item } from '../types/item';
import axios from './axios';

export const readMyItemList = () => axios.get('/my-item-list');
export const createMyItemList = (addMyItem: Item) =>
  axios.post('/my-item-list', addMyItem);
export const saveMyItemList = (myItemId: number) =>
  axios.put(`/my-item-list/${myItemId}`);
export const deleteMyItemList = (myItemId: number) =>
  axios.delete(`/my-item-list/${myItemId}`);
