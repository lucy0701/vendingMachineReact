import { Item } from '../types/item';
import axios from './axios';

// ok TODO: API 분리하기
export const readItems = () => axios.get('/items');
export const createItem = (addItem: Item) => axios.post('/items', addItem);
export const updateItem = (itemId: number, updateItem: Item) =>
  axios.put(`/items/${itemId}`, updateItem);
export const deleteItem = (itemId: number, removeItem: Item) =>
  axios.delete(`/items/${itemId}`, removeItem);
