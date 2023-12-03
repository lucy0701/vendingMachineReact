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

    console.log('PSJ: onClickModalBtn')
  };

  const handleModal = (message: string, onClickEvent: () => void) => {
    setModalMessage(message);
    setModalEvent(() => onClickEvent);
    onClickModalBtn();

    console.log('PSJ: handleModal')
  };

  const onClickModalCheckBtn = () => {
    if (modalEvent !== undefined && modalEvent !== null) {
      modalEvent();
      onClickModalBtn();

      console.log('PSJ: onClickModalCheckBtn')
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isModalPop) {
        e.preventDefault();
        onClickModalCheckBtn();
      }
    };
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [isModalPop,onClickModalCheckBtn]);

  return {
    isModalPop,
    modalMessage,
    onClickModalBtn,
    handleModal,
    onClickModalCheckBtn,
  };
};
