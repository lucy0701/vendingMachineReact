import React, { useEffect, useState } from 'react';
import { formatPrice } from '../utils/number';
import { Item } from '../types/item';
import { useTotalAmount } from '../hooks/useTotalAmount';
import { useItems } from '../hooks/useItems';
import { useIsPurchased } from '../hooks/useIsPurchased';

interface ItemBoxProps {
  item: Item;
  handleMyItem: (name: string, imgUrl: string) => void;
}

const ItemBox: React.FC<ItemBoxProps> = ({
  item,
  handleMyItem,
}) => {
  const { totalAmount, saveTotalAmount } = useTotalAmount();
  const { saveItem } = useItems();
  const { saveIsPurchased } = useIsPurchased();
  const [buttonColor, setButtonColor] = useState('default');

  const onChangeColorBuyBtn = () => {
    if (totalAmount >= item.price) {
      setButtonColor('red');
    }
  }

  useEffect (() => {
    onChangeColorBuyBtn();
  },[buttonColor])

  const onClickBuyBtn = () => {
    if (totalAmount > item.price && item.stock > 0) {
      const updateTotalNum = totalAmount - Number(item.price);
      const updateItemStock = {...item};
      updateItemStock.stock -= 1;
      saveTotalAmount(updateTotalNum);
      saveItem(updateItemStock);
      handleMyItem(item.itemName, item.url);
      saveIsPurchased(true);
    }
  };

  return (
    <div className="item-box">
      <div className="item-image">
        <p className="sold-out">Sold Out</p>
        <div className="item-price">{formatPrice(item.price)}</div>
        <div className="item-stock">{item.stock}</div>
        <img className="item-img-print" src={item.url} alt={item.itemName} />
      </div>
      <button className={`buy-btn ${buttonColor}`} onClick={onClickBuyBtn} >
        구매
      </button>
    </div>
  );
};

export default ItemBox;
