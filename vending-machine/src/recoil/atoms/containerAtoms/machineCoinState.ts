import { atom } from 'recoil';
import { Coin } from '../../../types/coin';

export const machineCoinState = atom<Coin[]>({
  key: 'machineCoinState',
  default: [],
});
