import React, { useState } from 'react';
import { Item } from '../types/item';
import { formatPrice } from '../utils/number';

interface ItemTableProps {
  getItemList: Item[];
  onClickDeleteItem: (item: Item) => void;
  handleDeleteItem: () => void;
  onChangeInput: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Item,
    index: number,
    maxMum: number,
  ) => void;
  onChangeTextInput: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Item,
    index: number,
  ) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({
  getItemList,
  onClickDeleteItem,
  onChangeTextInput,
  onChangeInput,
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
                      onChangeInput(e, 'price', index, 10000);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="manager-input"
                    value={formatPrice(item.stock)}
                    onChange={e => {
                      onChangeInput(e, 'stock', index, 2000);
                    }}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => onClickDeleteItem(item)}
                    // onClick={handleDeleteItem}
                  >
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
