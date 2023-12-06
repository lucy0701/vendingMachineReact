import React from 'react';
import { formatPrice } from '../utils/number';
import { Item } from '../types/item';
import { useTotalAmount } from '../hooks/useTotalAmount';
import { useItems } from '../hooks/useItems';
import { useIsPurchased } from '../hooks/useIsPurchased';
import { infoMessageState } from '../recoil/atoms/presentationAtoms/infoMessageState';
import { useSetRecoilState } from 'recoil';

interface ItemBoxProps {
  item: Item;
  handleMyItem: (name: string, imgUrl: string) => void;
}

const ItemBox: React.FC<ItemBoxProps> = ({ item, handleMyItem }) => {
  const { totalAmount, saveTotalAmount } = useTotalAmount();
  const { saveItem } = useItems();
  const { saveIsPurchased } = useIsPurchased();

  const setInfoMessage = useSetRecoilState(infoMessageState);

  const buttonStyle = {
    backgroundColor: totalAmount >= item.price && 0 < item.stock ? 'red' : '',
  };
  const soldoutStyle = {
    display: item.stock === 0 ? 'block' : 'none',
  };

  const displayInfoMessage = () => {
    if (item.stock <= 0) {
      setInfoMessage('재고가 부족 합니다');
    } else if (totalAmount < item.price) {
      setInfoMessage(`${item.price - totalAmount} 코인이 부족합니다`);
    }
    setTimeout (()=> {
      setInfoMessage('어서오세요');
    },1500)
  };

  const onClickBuyBtn = () => {
    if (totalAmount > item.price && item.stock > 0) {
      const updateTotalNum = totalAmount - Number(item.price);
      const updateItemStock = { ...item };
      updateItemStock.stock -= 1;
      saveTotalAmount(updateTotalNum);
      saveItem(updateItemStock);
      handleMyItem(item.itemName, item.url);
      saveIsPurchased(true);
      setInfoMessage('감사합니다');
      setTimeout (()=> {
        setInfoMessage('어서오세요');
      },1500)
    } else {
      displayInfoMessage();
    }
  };

  return (
    <div className="item-box">
      <div className="item-image">
        <p className="sold-out" style={soldoutStyle}>
          Sold Out
        </p>
        <div className="item-price">{formatPrice(item.price)}</div>
        <div className="item-stock">{item.stock}</div>
        <img className="item-img-print" src={item.url} alt={item.itemName} />
      </div>
      <button className="buy-btn" style={buttonStyle} onClick={onClickBuyBtn}>
        구매
      </button>
    </div>
  );
};

export default ItemBox;
