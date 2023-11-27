import React from 'react';
import { formatPrice } from '../utils/number';
import { Item } from '../types/item';

interface ItemBoxProps {
  item: Item;
  totalAmount: number;
  handleSaveTotalAmount: (updateTotalNum: number) => void;
  handleSaveItem: (item: Item) => void;
  handleMyItem: (name:string,imgUrl:string ) => void;
  handleUdateIsPurchased: (purchased: boolean) => void;
}

const ItemBox: React.FC<ItemBoxProps> = ({
  item,
  totalAmount,
  handleSaveTotalAmount,
  handleSaveItem,
  handleMyItem,
  handleUdateIsPurchased,
}) => {
  const onClickBuyBtn = () => {
    if (totalAmount > item.price && item.stock > 0) {
      const updateTotalNum = totalAmount - Number(item.price) ;
      const updateItemStock = item;
      updateItemStock.stock -= 1;
      handleSaveTotalAmount(updateTotalNum);
      handleSaveItem(updateItemStock);
      handleMyItem( item.itemName, item.url);
      handleUdateIsPurchased(true);
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
      <button className="buy-btn" onClick={onClickBuyBtn}>
        구매
      </button>
    </div>
  );
};

export default ItemBox;
