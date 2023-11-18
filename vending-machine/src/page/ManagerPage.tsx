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

  const { items, refreshItems, saveItem, addItem, removeItem } = useItems();
  const getItemList = [...items];

  const [selectItem, setSelectItem] = useState<Item>({
    id: 0,
    itemName: '',
    price: 0,
    stock: 0,
    url: '',
  });
  const [updateItems, setUpdateItems] = useState<Item[]>([]);

  const [isToggleOpen, setIsOpen] = useState(false);
  const [isModalPop, setIsModalPop] = useState(false);

  const [modalMessage, setModalMessage] = useState('');
  const [modalEvent, setModalEvent] = useState<() => void | null>(() => null);
  const [inpoMessage, setInpoMessage] = useState('');
  const maxMum = {
    price: 1000,
    stock: 20,
  }

  const setModal = (message: string, onClickEvent: () => void) => {
    setModalMessage(message);
    setModalEvent(() => onClickEvent);
    onClickModalBtn();
  };

  const onClickModalBtn = () => {
    setIsModalPop(!isModalPop);
  };

  const onClickToggleBtn = () => {
    setIsOpen(!isToggleOpen);
  };

  const onClickModalCheckBtn = () => {
    if (modalEvent !== undefined && modalEvent !== null) {
      modalEvent();
      onClickModalBtn();
    }
  };

  const handleAddItem = () => {
    if (
      items.length < 8 &&
      selectItem.price > 0 &&
      selectItem.stock > 0 &&
      selectItem.itemName !== null
    ) {
      addItem(selectItem);
      setSelectItem({ id: 0, itemName: '', price: 0, stock: 0, url: '' });
    }
  };
  const handleSaveItem = () => {
    updateItems.forEach(item => {
      saveItem(item);
    });
  };
  const handleDeleteItem = (item: Item) => {
    removeItem(item);
  };

  const updateItmeList = (index: number) => {
    setUpdateItems(updateItems => [
      ...updateItems.filter(item => item.id !== getItemList[index].id),
      getItemList[index],
    ]);
  };

  const onClickAddItem = () => {
    if (items.length >= 8) {
      setModal('최대 8개까지 등록이 가능', () => handleAddItem());
    } else if (
      selectItem.itemName === null ||
      selectItem.price <= 0 ||
      selectItem.stock <= 0
    ) {
      setModal('작성하지 않은 칸 있음', () => handleAddItem());
    } else {
      setModal('아이템을 추가 하시겠습니까?', () => handleAddItem());
    }
  };

  const onClickSaveItem = () => {
    setModal('저장 하시겠습니까?', () => handleSaveItem());
  };

  const onClickDeleteItem = (item: Item) => {
    setModal('삭제 하시겠습니까?', () => handleDeleteItem(item));
  };

  const onClickItemInit = () => {
    return refreshItems();
  };

  const changeUpdateItemList = (
    key: keyof Item,
    index: number,
    itemValue: string | number,
  ) => {
    (getItemList[index][key] as string | number) = itemValue;
    updateItmeList(index);
  };

  const onChangeUpdateInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Item,
    maxMum: number,
  ) => {
    const num = Number(e.target.value.replaceAll(',', ''));
    if (!Number.isInteger(num) || (Number.isInteger(num) && num > maxMum)) {
      e.preventDefault();
      setInpoMessage(
        `${selectItem.itemName}(이)의 ${key}는 ${maxMum} 이하로 입력해 주세요`,
      );
      return;
    }

    setSelectItem(prev => ({
      ...prev,
      [key]: formatPrice(num),
    }));
    setInpoMessage('');
  };

  const onChangeNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Item,
    index: number,
    maxMum: number,
  ) => {
    const num = Number(e.currentTarget.value.replaceAll(',', ''));

    if (!Number.isInteger(num) || (Number.isInteger(num) && num > maxMum)) {
      e.preventDefault();
      setInpoMessage(
        `${getItemList[index].itemName}(이)의 ${key}는 ${maxMum} 이하로 입력해 주세요`,
      );
      return;
    }
    changeUpdateItemList(key, index, num);
    setInpoMessage('');
  };

  const onChangeTextInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Item,
    index: number,
  ) => {
    const name = e.currentTarget.value;
    changeUpdateItemList(key, index, name);
  };

  return (
    <form name="manage-page" id="manager-page" method="POST">
      <h2 className="manager-page-title">관리자 페이지</h2>

      <div className="manager-page-setting">
        <div style={{ visibility: isToggleOpen ? 'visible' : 'hidden' }}>
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
                onChangeUpdateInput(e, 'price', maxMum.price);
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
                onChangeUpdateInput(e, 'stock', maxMum.stock);
              }}
            />
          </label>
        </div>

        <div className="add-item-btn-box01">
          <button
            type="button"
            className="add-item-btn item-btn"
            style={{ display: isToggleOpen ? 'none' : 'block' }}
            onClick={onClickItemInit}
          >
            수정 전
          </button>
          <button
            type="button"
            className="init-item-btn item-btn"
            style={{ display: isToggleOpen ? 'none' : 'block' }}
            onClick={onClickToggleBtn}
          >
            아이템 추가
          </button>
        </div>

        <div className="add-item-btn-box02">
          <button
            type="button"
            className="check-add-item-btn"
            style={{ display: isToggleOpen ? 'block' : 'none' }}
            onClick={onClickAddItem}
          >
            추가
          </button>
          <button
            type="button"
            className="cancel-add-item-btn"
            style={{ display: isToggleOpen ? 'block' : 'none' }}
            onClick={onClickToggleBtn}
          >
            취소
          </button>
        </div>
      </div>
      <p className="manager-inpo-message">{inpoMessage}</p>
      <ItemTable
        getItemList={getItemList}
        onClickDeleteItem={onClickDeleteItem}
        onChangeTextInput={onChangeTextInput}
        onChangeNumberInput={onChangeNumberInput}
        maxMum={maxMum}
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
        isShow={isModalPop}
        onClickModalCheckBtn={onClickModalCheckBtn}
        onClickModalBtn={onClickModalBtn}
      />
    </form>
  );
}
