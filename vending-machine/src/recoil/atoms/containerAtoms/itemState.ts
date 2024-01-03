import { atom } from 'recoil';
import { Item } from '../../../types/item';

export const itemState = atom<Item[]>({
  key: 'itemState',
  default: [],
});
