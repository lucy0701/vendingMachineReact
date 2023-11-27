import React from 'react';
import { MyItem } from '../types/myItem';

interface GetItemBoxProps {
  createMyItem: MyItem;
  isGetItem: boolean;
  onClickMyItme: () => void;
}
const GetItemBox: React.FC<GetItemBoxProps> = ({
  createMyItem,
  isGetItem,
  onClickMyItme,
}) => {
  return (
    <button className="get-item-box" onClick={onClickMyItme}>
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
