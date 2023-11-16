import React from 'react';
import { formatPrice } from '../utils/number';
import { Item } from '../types/item';

const ItemBox: React.FC<{item:Item}> = ( {item} ) => {
  return (
    <div className="item-box">
      <div className="item-image">
        <p className="sold-out">Sold Out</p>
        <div className="item-price">{formatPrice(item.price)}</div>
        <div className="item-stock">{item.stock}</div>
        <img className="item-img-print" src={item.url} alt={item.itemName} />
      </div>
      <button className="buy-btn">구매</button>
    </div>
  );
};

export default ItemBox;
