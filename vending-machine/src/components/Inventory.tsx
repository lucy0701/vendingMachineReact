// import { useState } from 'react';
import { useMyItems } from '../hooks/useMyItems';
import { MyItem } from '../types/myItem';
// import CheckModal from './CheckModal';

export default function Inventory() {
  const { myItems, removeMyItem } = useMyItems();
  //   const [isModalPop, setIsModalPop] = useState(false);
  //   const [selectMyItem, setSelectMyItem] = useState<MyItem>({
  //     id: 0,
  //     itemName: '',
  //     url: '',
  //   });

  const onClickDeleteMyItem = (myItem: MyItem) => {
    removeMyItem(myItem);
  };
  //   const onClickModalBtn = () => {
  //     setIsModalPop(!isModalPop);
  //   };
  //   const handleModal = (myItem: MyItem) => {
  //     onClickModalBtn();
  //     setSelectMyItem(myItem);
  //   };

  return (
    <div className="inventory">
      {myItems.map(myItem => {
        return (
          <div key={myItem.id} className="myitem-box">
            <img className="my-item" src={myItem.url} alt={myItem.itemName} />
            <button
              className="myitem-delete-btn"
              onClick={() => onClickDeleteMyItem(myItem)}
            >
              X
            </button>
          </div>
        );
      })}
      {/* <CheckModal
        modalMessage="삭제 하시겠습니까?"
        isShow={isModalPop}
        onClickModalCheckBtn={() => onClickDeleteMyItem(selectMyItem)}
        onClickModalBtn={onClickModalBtn}
      /> */}
    </div>
  );
}
