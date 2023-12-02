import { useMyItems } from '../hooks/useMyItems';
import { MyItem } from '../types/myItem';
import { useModal } from '../hooks/useModal';


export default function Inventory() {
  const { myItems, removeMyItem } = useMyItems();
  const { handleModal } = useModal();

  const onClickDeleteMyItem = (myItem: MyItem) => {
    handleModal('삭제 하시겠습니까? \n 삭제시 되돌리기 불가능', () =>
    removeMyItem(myItem),
    );
  };

  return (
    <div className="inventory">
      {myItems.map(myItem => {
        return (
          <div key={myItem.id} className="myitem-box" >
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
    </div>
  );
}
