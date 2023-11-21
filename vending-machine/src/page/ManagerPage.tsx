import ItemTable from '../components/ItemTable';
import { useState } from 'react';
import { Item } from '../types/item';
import { useItems } from '../hooks/useItems';
import CheckModal from '../components/CheckModal';
import { Link } from 'react-router-dom';

export default function ManagerPage() {
  // TODO: 커스텀 훅 사용 익혀보기
  // TODO: 전역 상태관리 나중에 적용
  // TODO: 가격 제한폭 + 안내문구 추가

  // 컴포넌트 분리 (정리)
  // 자판기 : 동전 드래그
  // 전역 상태관리 나중에 적용

  const { items, refreshItems, saveItem, addItem, removeItem } = useItems();
  // TODO: 얕은복사 깊은복사 이해하기
  // TODO: 에러 처리
  // onError,

  const getItemList = JSON.parse(JSON.stringify(items));

  const [isModalPop, setIsModalPop] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalEvent, setModalEvent] = useState<() => void | null>(() => null);

  const handleModal = (message: string, onClickEvent: () => void) => {
    setModalMessage(message);
    setModalEvent(() => onClickEvent);
    onClickModalBtn();
  };

  const onClickModalBtn = () => {
    setIsModalPop(!isModalPop);
  };

  const onClickModalCheckBtn = () => {
    if (modalEvent !== undefined && modalEvent !== null) {
      modalEvent();
      onClickModalBtn();
    }
  };
  
  const onClickItemInit = () => {
    return refreshItems();
  };

  const handleSaveItem = (updateItems: Item[]) => {
    updateItems.forEach(item => {
      saveItem(item);
    });
  };

  const handleAddItem = (item: Item) => {
    if (
      items.length < 8 &&
      item.price > 0 &&
      item.stock > 0 &&
      item.itemName !== null
    ) {
      addItem(item);
    }
  };

  const handleDeleteItem = (item: Item) => {
    removeItem(item);
  };

  return (
    <form name="manage-page" id="manager-page" method="POST">
      <h2 className="manager-page-title">관리자 페이지</h2>

      <div className="manager-page-setting">
        <div className="add-item-btn-box01">
          <button
            type="button"
            className="add-item-btn item-btn"
            onClick={onClickItemInit}
          >
            수정 전
          </button>
        </div>
      </div>
      <ItemTable
        items={getItemList}
        handleSaveItem={handleSaveItem}
        handleAddItem={handleAddItem}
        handleDeleteItem={handleDeleteItem}
        handleModal={(message: string, onClickEvent: () => void) =>
          handleModal(message, onClickEvent)
        }
      />
      <div className="manager-btn-box">
        <Link to="/" className="manager-btn">
          Home
        </Link>
      </div>
      <CheckModal
        modalMessage={modalMessage}
        isShow={isModalPop}
        onClickModalCheckBtn={onClickModalCheckBtn}
        onClickModalBtn={onClickModalBtn}
      />
    </form>
  );
}
