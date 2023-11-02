import React from 'react';
import PropTypes from 'prop-types';

export default function UserCoin({coin, count, onClickCoinBtn}) {
  return (
    <>
      <button className="user-coin-btn" value={coin} onClick={onClickCoinBtn}> {coin} </button>
      <p className="user-coin-count"> {count} </p>
    </>
  );
}
UserCoin.propTypes = {
  coin: PropTypes.string,
  count: PropTypes.number,
  onClickCoinBtn: PropTypes.func.isRequired
};
