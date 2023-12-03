import React from 'react';
import { useModal } from '../hooks/useModal';

const CheckModal: React.FC = () => {
  const { isModalPop, modalMessage, onClickModalBtn, onClickModalCheckBtn } = useModal();

  console.log('PSJ: isModalPop', isModalPop)
  return (
    <div
      className="modal-box"
      style={{ display: isModalPop ? 'block' : 'none' }}
    >
      <div
        className="check-modal"
        style={{ display: isModalPop ? 'block' : 'none' }}
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
