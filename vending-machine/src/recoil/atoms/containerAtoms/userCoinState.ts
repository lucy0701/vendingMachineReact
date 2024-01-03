import { atom } from 'recoil';
import { Coin } from '../../../types/coin';

export const userCoinState = atom<Coin[]>({
  key: 'userCoinState',
  default: [],
});
