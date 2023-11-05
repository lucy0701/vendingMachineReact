import React from 'react';

interface ModalProps {
  name: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClickModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  name,
  isOpen,
  children,
  onClickModal,
}) => {
  return (
    <div className={name} style={{ display: isOpen ? 'block' : 'none' }}>
      <div>{children}</div>
      <button onClick={onClickModal}>Close</button>
    </div>
  );
};
export default Modal;
