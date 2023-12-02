import { atom } from 'recoil';

export const dragInpoMessageState = atom<string> ({
    key: "dragInpoMessageState",
    default: ''
})

export const isDropFieldState = atom<boolean> ({
    key: "isDropFieldState",
    default: false
})