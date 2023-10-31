import React from 'react';
import PropTypes from 'prop-types';

export default function ItemBox( {itemName,stock,price,image} ) {
  return (
    <div className="item-box">
      <div className="item-image">
        <p className="sold-out">sold out</p>
        <div className="item-price">{price}</div>
        <div className="item-stock">{stock}</div>
        <img className="item-img-print" src={image} alt={itemName} />
      </div>
      <button className="buy-btn" onClick={() => {}}>
        구매 하기
      </button>
    </div>
  );
}
ItemBox.propTypes = {
  itemName: PropTypes.string,
  stock: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string
};