import { Item } from '../types/item';
import axios from './axios';

export const readMyItemList = () => axios.get('/my-item-list');
export const createMyItemList = (addMyItem: Item) =>
  axios.post('/my-item-list', addMyItem);
export const updateMyItem = (myItemId: number, saveMyItemList: Item) =>
  axios.put(`/my-item-list/${myItemId}`, saveMyItemList);
export const deleteMyItemList = (myItemId: number, removeMyItem: Item) =>
  axios.delete(`/my-item-list/${myItemId}`, removeMyItem);
