import React, { useState } from 'react';
import { Item } from '../types/item';
import { formatPrice } from '../utils/number';

interface ItemTableProps {
  getItemList: Item[];
  maxMum: {
    price: number;
    stock: number;
  };
  // eslint-disable-next-line no-unused-vars
  onClickDeleteItem: (item: Item) => void;
  onChangeNumberInput: (
    // eslint-disable-next-line no-unused-vars
    e: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line no-unused-vars
    key: keyof Item,
    // eslint-disable-next-line no-unused-vars
    index: number,
    // eslint-disable-next-line no-unused-vars
    maxMum: number,
  ) => void;
  onChangeTextInput: (
    // eslint-disable-next-line no-unused-vars
    e: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line no-unused-vars
    key: keyof Item,
    // eslint-disable-next-line no-unused-vars
    index: number,
  ) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({
  getItemList,
  maxMum,
  onClickDeleteItem,
  onChangeTextInput,
  onChangeNumberInput,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<HTMLElement | null>(
    null,
  );

  const onClickItemList = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;

    if (selectedTarget) {
      selectedTarget.style.background = '#fff7f7';
    }
    target.style.background = '#c3e9bf';
    setSelectedTarget(target);
  };

  return (
    <div className="manager-item-table">
      <table className="manager-item-list">
        <tbody>
          <tr>
            <th>List</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Delete</th>
          </tr>
          {getItemList.map((item, index) => {
            return (
              <tr
                key={item.id}
                className="item-list"
                onClick={e => {
                  onClickItemList(e);
                }}
              >
                <td className="item-list-name">
                  <input
                    type="text"
                    className="manager-input"
                    value={item.itemName}
                    onChange={e => {
                      onChangeTextInput(e, 'itemName', index);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="manager-input"
                    value={formatPrice(item.price)}
                    onChange={e => {
                      onChangeNumberInput(e, 'price', index, maxMum.price);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="manager-input"
                    value={formatPrice(item.stock)}
                    onChange={e => {
                      onChangeNumberInput(e, 'stock', index, maxMum.stock);
                    }}
                  />
                </td>
                <td>
                  <button type="button" onClick={() => onClickDeleteItem(item)}>
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ItemTable;
