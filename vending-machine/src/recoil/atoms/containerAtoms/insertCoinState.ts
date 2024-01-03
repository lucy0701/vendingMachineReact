import { atom } from 'recoil';
import { Coin } from '../../../types/coin';

export const insertCoinState = atom<Coin[]>({
  key: 'insertCoinState',
  default: [],
});
