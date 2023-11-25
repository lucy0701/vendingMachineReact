import ItemTable from '../components/ItemTable';
import { useState } from 'react';
import { Item } from '../types/item';
import { useItems } from '../hooks/useItems';
import CheckModal from '../components/CheckModal';

export default function ManagerPage() {
  // TODO: 커스텀 훅 사용 익혀보기
  // TODO: 전역 상태관리 나중에 적용
  // TODO: 가격 제한폭 + 안내문구 추가

  // 컴포넌트 분리 (정리)
  // 자판기 : 동전 드래그
  // 전역 상태관리 나중에 적용

  const { refreshItems, items, saveItem, addItem, removeItem } = useItems();
  // TODO: 얕은복사 깊은복사 이해하기
  // TODO: 에러 처리
  // onError,

  const copyItems = JSON.parse(JSON.stringify(items));

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

  const handleRefreshItem = () => {
    return refreshItems();
  };

  return (
    <form name="manage-page" id="manager-page" method="POST">
      <h2 className="manager-page-title">관리자 페이지</h2>

      <ItemTable
        items={copyItems}
        handleSaveItem={handleSaveItem}
        handleAddItem={handleAddItem}
        handleDeleteItem={handleDeleteItem}
        handleModal={(message: string, onClickEvent: () => void) =>
          handleModal(message, onClickEvent)
        }
        handleRefreshItem={handleRefreshItem}
      />

      <CheckModal
        modalMessage={modalMessage}
        isShow={isModalPop}
        onClickModalCheckBtn={onClickModalCheckBtn}
        onClickModalBtn={onClickModalBtn}
      />
    </form>
  );
}
