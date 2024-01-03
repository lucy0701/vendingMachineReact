import React from 'react';
import { MyItem } from '../types/myItem';

interface GetItemBoxProps {
  createMyItem: MyItem;
  isGetItem: boolean;
  onClickMyItem: () => void;
}
const GetItemBox: React.FC<GetItemBoxProps> = ({
  createMyItem,
  isGetItem,
  onClickMyItem,
}) => {
  return (
    <button className="get-item-box" onClick={onClickMyItem}>
      <img
        className="drop-item"
        src={createMyItem.url}
        alt={createMyItem.itemName}
        style={{ display: isGetItem ? 'block' : 'none' }}
      />
    </button>
  );
};
export default GetItemBox;
