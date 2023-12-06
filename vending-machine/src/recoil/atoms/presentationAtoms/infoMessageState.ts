import { atom } from 'recoil';

export const infoMessageState = atom<string>({
    key: 'infoMessageState',
    default: '어서오세요'
});