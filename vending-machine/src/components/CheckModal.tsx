// import React, { useState } from 'react';
import React from 'react';

interface CheckModalProps {
  modalMessage: string;
  isShow: boolean;
  onClickModalCheckBtn: () => void;
  onClickModalBtn: () => void;
}

const CheckModal: React.FC<CheckModalProps> = ({
  modalMessage,
  isShow,
  onClickModalCheckBtn,
  onClickModalBtn,
}) => {
  return (
    <div className="modal-box" style={{ display: isShow ? 'block' : 'none' }}>
      <div
        className="check-modal"
        style={{ display: isShow ? 'block' : 'none' }}
      >
        <div className="check-modal-message" style={{ whiteSpace: 'pre-line' }}>
          {modalMessage}
        </div>
        <div className="check-modal-but-box">
          <button
            type="button"
            className="check-btn check-moda"
            onClick={onClickModalCheckBtn}
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
    </div>
  );
};
export default CheckModal;
