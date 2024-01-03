import { useEffect } from 'react';
import {
  modalMessageState,
  isModalState,
  modalEventState,
} from '../recoil/atoms/presentationAtoms/modalState';
import { useRecoilState } from 'recoil';

export const useModal = () => {
  const [isModalPop, setIsModalPop] = useRecoilState<boolean>(isModalState);
  const [modalMessage, setModalMessage] =
    useRecoilState<string>(modalMessageState);
  const [modalEvent, setModalEvent] =
    useRecoilState<() => void | null>(modalEventState);

  const onClickModalBtn = () => {
    setIsModalPop(!isModalPop);
  };

  const handleModal = (message: string, onClickEvent: () => void) => {
    setModalMessage(message);
    setModalEvent(() => onClickEvent);
    onClickModalBtn();
  };

  const onClickModalCheckBtn = () => {
    if (modalEvent !== undefined && modalEvent !== null) {
      modalEvent();
      onClickModalBtn();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isModalPop) {
        e.preventDefault();
        onClickModalCheckBtn();
      }
      if (e.key === 'Escape' && isModalPop) {
        e.preventDefault();
        onClickModalBtn();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isModalPop]);

  return {
    isModalPop,
    modalMessage,
    onClickModalBtn,
    handleModal,
    onClickModalCheckBtn,
  };
};
