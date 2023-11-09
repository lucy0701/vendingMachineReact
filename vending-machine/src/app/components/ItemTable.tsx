import React, { useState } from 'react';

interface Items {
  id: number;
  itemName: string;
  price: number;
  stock: number;
  url: string;
}

interface ItemTableProps {
  items: Items[];
  addSelectItem: (item: Items) => void;
  setIsActiveInput: (isActiveInput: boolean) => void;
  isActiveTable: boolean;
}

const ItemTable: React.FC<ItemTableProps> = ({ items, addSelectItem, setIsActiveInput,isActiveTable }) => {
  const [selectedTarget, setSelectedTarget] = useState<HTMLElement | null>(
    null,
  );

  const onClickItemList = (e: React.MouseEvent, item: Items) => {
    const target = e.currentTarget as HTMLElement;
    if(isActiveTable){
      if (selectedTarget) {
        selectedTarget.style.background = '#fff7f7';
      }
      target.style.background = '#c3e9bf';
  
      setSelectedTarget(target);
      addSelectItem(item);
      setIsActiveInput(false);
    }

  };

  return (
    <table className="manager-item-list">
      <tbody>
        <tr>
          <th>List</th>
          <th>Stock</th>
          <th>Price</th>
        </tr>
        {items.map((item, index) => {
          return (
            <tr
              key={index}
              className="item-list"
              data-type={index}
              onClick={e => {
                onClickItemList(e, item);
              }}
            >
              <td className="item-list-name">{item.itemName}</td>
              <td>{item.stock}</td>
              <td>{item.price}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default ItemTable;
