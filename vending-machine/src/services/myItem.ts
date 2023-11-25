import { MyItem } from '../types/myItem';
import axios from './axios';

export const readMyItems = () => axios.get('/myitems');
export const createMyItem = (addMyItem: MyItem) =>
  axios.post('/myitems', addMyItem);
export const updateMyItem = (myItemId: number, saveMyItem: MyItem) =>
  axios.put(`/myitems/${myItemId}`, saveMyItem);
export const deleteMyItem = (myItemId: number, removeMyItem: MyItem) =>
  axios.delete(`/myitems/${myItemId}`, removeMyItem);
