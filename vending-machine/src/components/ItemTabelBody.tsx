import React from 'react';
import { formatPrice } from '../utils/number';
import { Item } from '../types/item';

interface ItemTabelBodyPorps {
  item: Item;
  buttonName: string;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStock: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton: () => void;
  onClickTabelTr: (e: React.MouseEvent) => void;
}
const ItemTabelBody = ({
  item,
  buttonName,
  onChangeName,
  onChangePrice,
  onChangeStock,
  onClickButton,
  onClickTabelTr
}: ItemTabelBodyPorps) => {


  return (
    <tr
      className="item-list"
      onClick={e => {
        onClickTabelTr(e);
      }}
    >
      <td className="item-list-name">
        <input
          type="text"
          className="manager-input"
          value={item.itemName}
          placeholder={item.itemName}
          onChange={onChangeName}
        />
      </td>
      <td>
        <input
          type="text"
          className="manager-input"
          value={formatPrice(item.price)}
          placeholder={formatPrice(item.price)}
          onChange={onChangePrice}
        />
      </td>
      <td>
        <input
          type="text"
          className="manager-input"
          value={formatPrice(item.stock)}
          placeholder={formatPrice(item.stock)}
          onChange={onChangeStock}
        />
      </td>
      <td>
        <button
          type="button"
          onClick={onClickButton}
        >
          {buttonName}
        </button>
      </td>
    </tr>
  );
};
export default ItemTabelBody;
