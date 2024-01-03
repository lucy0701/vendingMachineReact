import React from 'react';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClickModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClickModal }) => {
  
  return (
    <div className="coin-modal" style={{ display: isOpen ? 'block' : 'none' }}>
      <div>{children}</div>
      <button
        type="button"
        className="coin-modal-close-btn"
        onClick={onClickModal}
      >
        CLOSE
      </button>
    </div>
  );
};
export default Modal;
