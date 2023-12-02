import { atom } from "recoil";

export const modalMessageState = atom<string> ({
    key: "modalMessageState",
    default: ''
})
export const isModalState = atom<boolean> ({
    key: "isModalPopState",
    default: false
})
export const modalEventState = atom<()=>void> ({
    key: "modalEventState",
    default: () => null
})