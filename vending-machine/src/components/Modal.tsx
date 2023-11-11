import React from 'react';

interface ModalProps {
  name: string;
  btnClassName: string;
  btnName: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClickModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  name,
  isOpen,
  btnClassName,
  btnName,
  children,
  onClickModal,
}) => {
  return (
    <div className={name} style={{ display: isOpen ? 'block' : 'none' }}>
      <div>{children}</div>
      <button type="button" className={btnClassName} onClick={onClickModal}>
        {btnName}
      </button>
    </div>
  );
};
export default Modal;