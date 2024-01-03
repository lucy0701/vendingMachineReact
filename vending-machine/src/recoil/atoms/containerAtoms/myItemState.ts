import { atom } from 'recoil';
import { MyItem } from '../../../types/myItem';

export const myItemState = atom<MyItem[]>({
  key: 'myItemState',
  default: [],
});
