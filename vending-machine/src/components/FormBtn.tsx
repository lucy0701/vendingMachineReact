import React, { useState } from 'react';

interface FormBtnProps {
  openBtnValue: string;
  checkBtn: string;
  btnActive: boolean;
  onClickFormBtn: () => void;
  onClickOpenBtn: () => void;
  onClickCloseBtn: () => void;
}

const FormBtn: React.FC<FormBtnProps> = ({
  openBtnValue,
  checkBtn,
  onClickFormBtn,
  onClickOpenBtn,
  onClickCloseBtn,
  btnActive,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => {
    if (isOpen) {
      setIsOpen(false);
      onClickCloseBtn();
    } else {
      setIsOpen(true);
      onClickOpenBtn();
    }
  };

  return (
    <div className="form-btn-box">
      {/* ok TODO: button 태그로 다시 변경 */}
      <button
        type="button"
        className="form-btn form-btn-01"
        style={{ display: isOpen ? 'none' : 'block' }}
        onClick={onClickModal}
        disabled={btnActive}
      >
        {openBtnValue}
      </button>
      <button
        type="button"
        className="form-btn form-btn-02"
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={onClickFormBtn}
      >
        {checkBtn}
      </button>
      <button
        type="button"
        className="form-btn form-btn-03"
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={onClickModal}
      >
        취소
      </button>
    </div>
  );
};
export default FormBtn;
