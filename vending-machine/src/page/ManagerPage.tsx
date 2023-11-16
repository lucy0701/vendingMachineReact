import ItemTable from '../components/ItemTable';
import { useState } from 'react';
import { Item } from '../types/item';
import { useItems } from '../hooks/useItems';
import { formatPrice } from '../utils/number';
import CheckModal from '../components/CheckModal';
import { Link } from 'react-router-dom';

export default function ManagerPage() {
  // TODO: 커스텀 훅 사용 익혀보기
  // TODO: 전역 상태관리 나중에 적용
  // TODO: 가격 제한폭 + 안내문구 추가

  // 저장 및 삭제 모달
  // 컴포넌트 분리 (정리)
  // 자판기 : 동전 드래그
  // 초기화 버튼
  // 전역 상태관리 나중에 적용

  const { saveItem, items, addItem, removeItem } = useItems();
  const getItemList = [...items];
  const [selectItem, setSelectItem] = useState<Item>({
    id: 0,
    itemName: '',
    price: 0,
    stock: 0,
    url: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [modalMessage, setModalMessage] = useState('');



  const toggleModal = (message: string, isDisabled: boolean) => {
    setIsDisabled(isDisabled);
    setModalMessage(message);
    onClickModalBtn();
  };

  const onClickModalBtn = () => {
    setIsShow(!isShow);
  };

  const onClickToggleBtn = () => {
    setIsOpen(!isOpen);
  };

  const onClickAddItem = () => {
    if (
      items.length < 8 &&
      selectItem.price > 0 &&
      selectItem.stock > 0 &&
      selectItem.itemName !== null
    ) {
      addItem(selectItem);
      onClickModalBtn();
      setSelectItem({ id: 0, itemName: '', price: 0, stock: 0, url: '' });
    }
  };

  const onClickDeleteItem = (item: Item) => {
    removeItem(item);
  };

  const handleAddItem = () => {
    if (items.length >= 8) {
      toggleModal('최대 8개까지 등록이 가능', true);
    } else if (selectItem.itemName === null) {
      toggleModal('이름을 입력하세요', true);
    } else if (selectItem.price <= 0 && selectItem.stock <= 0) {
      toggleModal('아이템과 재고는 0이상 입력', true);
    } else {
      toggleModal('아이템을 추가 하시겠습니까?', false);
    }
  };
  const handleDeleteItem = () => {
    toggleModal('삭제 하시겠습니까?', false);
  };

  const onChangeUpdateInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    maxMum: number,
  ) => {
    const num = Number(e.target.value.replaceAll(',', ''));
    if (!Number.isInteger(num) || (Number.isInteger(num) && num > maxMum)) {
      e.preventDefault();
      return;
    }
    setSelectItem(prev => ({
      ...prev,
      [key]: formatPrice(num),
    }));
  };

  const [updateItems, setUpdateItems] = useState<Item[]>([]);
  const updateItmeList = (index: number) => {
    setUpdateItems(updateItems => [
      ...updateItems.filter(item => item.id !== getItemList[index].id),
      getItemList[index],
    ]);
  };
  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Item,
    index: number,
    maxMum: number,
  ) => {
    const num = Number(e.currentTarget.value.replaceAll(',', ''));

    if (!Number.isInteger(num) || (Number.isInteger(num) && num > maxMum)) {
      e.preventDefault();
      return;
    }
    (getItemList as any)[index][key] = num;
    updateItmeList(index);
  };

  const onChangeTextInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Item,
    index: number,
  ) => {
    
    const name = e.currentTarget.value;
    (getItemList as any)[index][key] = name;
    updateItmeList(index);
  };

  const onClickSaveItem = () => {
    updateItems.forEach(item => {
      saveItem(item);
    });
  };

  return (
    <form name="manage-page" id="manager-page" method="POST">
      <h2 className="manager-page-title">관리자 페이지</h2>

      <div className="manager-page-setting">
        <div style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
          <label>
            이름
            <input
              type="text"
              className="add-item-input"
              value={selectItem.itemName}
              onChange={e => {
                setSelectItem(prev => ({
                  ...prev,
                  itemName: e.target.value,
                }));
              }}
            />
          </label>

          <label>
            가격
            <input
              type="text"
              className="add-item-input"
              value={selectItem.price}
              onChange={e => {
                onChangeUpdateInput(e, 'price', 10000);
              }}
            />
          </label>

          <label>
            재고
            <input
              type="text"
              className="add-item-input"
              value={selectItem.stock}
              onChange={e => {
                onChangeUpdateInput(e, 'stock', 2000);
              }}
            />
          </label>
        </div>
        <div className="add-item-box">
          <button
            type="button"
            className="add-item-btn"
            style={{ display: isOpen ? 'none' : 'block' }}
            onClick={onClickToggleBtn}
          >
            아이템 추가
          </button>
          <button
            type="button"
            className="add-item-btn"
            style={{ display: isOpen ? 'block' : 'none' }}
            onClick={() => handleAddItem()}
          >
            추가
          </button>
          <button
            type="button"
            className="add-item-btn"
            style={{ display: isOpen ? 'block' : 'none' }}
            onClick={onClickToggleBtn}
          >
            취소
          </button>
        </div>
      </div>
      <ItemTable
        getItemList={getItemList}
        onClickDeleteItem={onClickDeleteItem}
        handleDeleteItem={handleDeleteItem}
        onChangeTextInput={onChangeTextInput}
        onChangeInput={onChangeInput}
      />
      <div className="manager-btn-box">
        <Link to="/" className="manager-btn">
          Home
        </Link>

        <button
          type="button"
          className="manager-btn"
          onClick={() => onClickSaveItem()}
        >
          아이템 수정
        </button>
      </div>
      <CheckModal
        modalMessage={modalMessage}
        isShow={isShow}
        onClickModalCheckBtn={onClickAddItem}
        onClickModalBtn={onClickModalBtn}
        isDisabled={isDisabled}
      />
    </form>
  );
}
