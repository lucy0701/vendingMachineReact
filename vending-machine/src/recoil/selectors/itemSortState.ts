import { selector } from 'recoil';
import { userCoinState } from '../atoms/containerAtoms/userCoinState';

export const coinCountState = selector({
  key: 'coinCountState',
  get: ({ get }) => {
    const coinCount = get(userCoinState);
    
    return coinCount;
  },
  set: ({ set }, newValue) => {

    set(userCoinState, newValue);
  },
});