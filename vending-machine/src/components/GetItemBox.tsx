import React from 'react';
import { MyItem } from '../types/myItem';

interface GetItemBoxProps {
  updateMyItem: MyItem;
  isGetItem: boolean;
  onClickMyItme: () => void;
}
const GetItemBox: React.FC<GetItemBoxProps> = ({
  updateMyItem,
  isGetItem,
  onClickMyItme,
}) => {
  return (
    <button className="get-item-box" onClick={onClickMyItme}>
      <img
        className="drop-item"
        src={updateMyItem.url}
        alt={updateMyItem.itemName}
        style={{ display: isGetItem ? 'block' : 'none' }}
      />
    </button>
  );
};
export default GetItemBox;
