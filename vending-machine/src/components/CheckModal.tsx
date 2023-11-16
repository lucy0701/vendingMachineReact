// import React, { useState } from 'react';
import React from 'react';

interface CheckModalProps {
  modalMessage: string;
  isShow: boolean;
  isDisabled: boolean;
  onClickModalCheckBtn: () => void;
  onClickModalBtn: () => void;
}

const CheckModal: React.FC<CheckModalProps> = ({
  modalMessage,
  isShow,
  onClickModalCheckBtn,
  onClickModalBtn,
  isDisabled
}) => {

  return (
    <div className="check-modal" style={{ display: isShow ? 'block' : 'none' }}>
      <div className="check-modal-message">{modalMessage}</div>
      <div className="check-modal-but-box">
        <button
          type="button"
          className="check-btn check-moda"
          onClick={onClickModalCheckBtn}
          disabled = {isDisabled ? true:false}
        >
          확인
        </button>
        <button
          type="button"
          className="cancel-btn check-moda"
          onClick={onClickModalBtn}
        >
          취소
        </button>
      </div>
    </div>
  );
};
export default CheckModal;
