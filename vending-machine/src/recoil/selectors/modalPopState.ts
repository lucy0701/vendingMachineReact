import { selector } from 'recoil';
import { DefaultValue } from 'recoil';
import {
  modalMessageState,
  isModalState,
  modalEventState,
} from '../atoms/presentationAtoms/modalState';

interface ModalPopState {
  modalMessage: string;
  isModalPop: boolean;
  modalEvent: () => void;
}

export const isModalPopState = selector({
  key: 'setIsModalPopState',
  get: ({ get }) => {
    const isModalPop = get(isModalState);
    return isModalPop;
  },
  set: ({ set }, newValue) => {
    newValue = !isModalState;
    set(isModalState, !newValue);
  },
});

export const modalPopState = selector<ModalPopState>({
  key: 'modalPopState',
  get: ({ get }) => {
    const modalMessage = get(modalMessageState);
    const isModalPop = get(isModalState);
    const modalEvent = get(modalEventState);

    return {
      modalMessage,
      isModalPop,
      modalEvent,
    };
  },
  set: ({ set }, newValue) => {
    if (
      typeof newValue !== 'undefined' &&
      !(newValue instanceof DefaultValue)
    ) {
      newValue.isModalPop = !isModalState;

      set(modalMessageState, newValue.modalMessage);
      set(isModalState, newValue.isModalPop);
      set(modalEventState, newValue.modalEvent);
    }
  },
});
