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
  btnActive
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => {
    if(isOpen){
        setIsOpen(false)
        onClickCloseBtn();
    }else {
        setIsOpen(true)
        onClickOpenBtn();
    }
};

  return (
    <div className="form-btn-box">
      <input
        type="button"
        className="form-btn form-btn-01"
        value={openBtnValue}
        style={{ display: isOpen ? 'none' : 'block' }}
        onClick={onClickModal}
        disabled={btnActive}
      />
      <input
        type="button"
        className="form-btn form-btn-02"
        value={checkBtn}
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={onClickFormBtn}
      />
    <input
        type="button"
        className="form-btn form-btn-03"
        value= "취소"
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={onClickModal}
      />
    </div>
  );
};
export default FormBtn;
