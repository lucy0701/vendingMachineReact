import { Item } from '../types/item';
import axios from './axios';

// ok TODO: API 분리하기
export const readItems = () => axios.get('/items');
export const createItem = (addItem: Item) => axios.post('/items', addItem);
export const saveItem = (itemId: number) => axios.put(`/items/${itemId}`);
export const deleteItem = (itemId: number) => axios.delete(`/items/${itemId}`);
