import {modalMessageState, isModalState, modalEventState} from '../recoil/atoms/presentationAtoms/modalState'
import { useRecoilState } from 'recoil';

export const useModal = () => {
  const [isModalPop, setIsModalPop] = useRecoilState<boolean>(isModalState);
  const [modalMessage, setModalMessage] = useRecoilState<string>(modalMessageState);
  const [modalEvent, setModalEvent] = useRecoilState<() => void | null>(modalEventState);

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

  return {
    isModalPop,
    modalMessage,
    onClickModalBtn,
    handleModal,
    onClickModalCheckBtn
  };
};
