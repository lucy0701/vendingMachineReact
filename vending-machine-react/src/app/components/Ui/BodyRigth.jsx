import React from 'react';
import PropTypes from 'prop-types';

export default function BodyRigth({ onClickMadal, totalAmount }) {
  return (
      <div className="body-rigth">
        <h2>CRYSTAL</h2>
        <div className="total-screen">
          <span className="total-num">{totalAmount.total}</span>
        </div>
        <button className="ent-coin-btn" onClick={onClickMadal}>
          Click
        </button>
        <button className="return-coin-btn">반환</button>
        <div className="get-item-box" />
      </div>
  );
  
}
BodyRigth.propTypes = {
  onClickMadal: PropTypes.func.isRequired,
  totalAmount: PropTypes.array.isRequired,
};
