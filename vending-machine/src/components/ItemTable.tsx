import React, { useState } from 'react';
import { Item } from '../types/item';
import ItemTabelBody from './ItemTabelBody';
import { useItems } from '../hooks/useItems';
import { useModal } from '../hooks/useModal';
import { useRecoilState } from 'recoil';
import { itemState } from '../recoil/atoms/containerAtoms/itemState';

const ItemTable = () => {
  const { handleModal } = useModal();
  const { refreshItems, saveItem, addItem, removeItem } = useItems();

  const [items, setItems] = useRecoilState<Item[]>(itemState);

  const [inpoMessage, setInpoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const initialItemState: Item = {
    id: 0,
    itemName: '',
    price: 0,
    stock: 0,
    url: '',
    isModified: false,
  };
  const [selectItem, setSelectItem] = useState<Item>(initialItemState);

  const maxiMum: { [key: string]: number } = {
    itemName: 8,
    price: 10000,
    stock: 200,
  };

  const [selectedTarget, setSelectedTarget] = useState<HTMLElement | null>(
    null,
  );

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

  const handleSaveItem = (updateItems: Item[]) => {
    updateItems.forEach(item => {
      const newItem = { ...item };
      if (newItem.isModified === true) {
        newItem.isModified = false;
        saveItem(newItem);
      }
    });
  };

  const handleUpdateItems = (
    item: Item,
    key: string,
    value: string | number,
  ) => {
    const updatedItem = {
      ...item,
      [key]: value,
      isModified: true,
    };
    setItems(prevItems => {
      const itemIndex = prevItems.findIndex(
        prevItem => prevItem.id === item.id,
      );
      const newItems = [...prevItems];
      newItems[itemIndex] = updatedItem;
      return newItems;
    });
  };

  const changeSelectItem = (key: string, value: string | number) => {
    setSelectItem(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const onChangeNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    item: Item,
  ) => {
    const num = Number(e.currentTarget.value.replaceAll(',', ''));

    if (
      !Number.isInteger(num) ||
      (Number.isInteger(num) && num > maxiMum[key])
    ) {
      e.preventDefault();
      setInpoMessage(`${key}는 ${maxiMum[key]} 이하로 입력해 주세요`);

      setErrorMessage('');
      return;
    }
    handleUpdateItems(item, key, num);
  };

  const onChangeTextInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    item: Item,
  ) => {
    const name = e.currentTarget.value;

    if (name.length > maxiMum[key]) {
      e.preventDefault();
      setInpoMessage(`이름은 ${maxiMum[key]}자 이하로 입력해 주세요`);

      setErrorMessage('');
      return;
    }

    setErrorMessage('');
    handleUpdateItems(item, key, name);
  };

  const onChangeAddItemNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const num = Number(e.currentTarget.value.replaceAll(',', ''));
    if (
      !Number.isInteger(num) ||
      (Number.isInteger(num) && num > maxiMum[key])
    ) {
      e.preventDefault();
      setInpoMessage(`${key}는 ${maxiMum[key]} 이하로 입력해 주세요`);

      setErrorMessage('');
      return;
    }

    changeSelectItem(key, num);
  };

  const onChangeAddItemTextInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const name = e.currentTarget.value;
    if (name.length > maxiMum.itemName) {
      e.preventDefault();
      setInpoMessage(`이름은 ${maxiMum.itemName}자 이하로 입력해 주세요`);

      setErrorMessage('');
      return;
    }
    setErrorMessage('');
    changeSelectItem(key, name);
  };

  const onError = (selectItem: Item) => {
    if (items.length >= 8) {
      return { message: '최대 8개까지 등록이 가능합니다' };
    } else if (selectItem.itemName === null || selectItem.itemName === '') {
      return { message: '이름을 입력 하세요' };
    } else if (selectItem.price <= 0) {
      return { message: '가격을 1원 이상 입력 하세요' };
    } else if (selectItem.stock <= 0) {
      return { message: '재고를 1개 이상 입력 하세요' };
    } else {
      return null;
    }
  };

  const onClickAddItem = (e: React.MouseEvent) => {
    const error = onError(selectItem);

    if (error) {
      e.preventDefault();
      setErrorMessage(error.message);
    } else {
      handleModal('아이템을 추가 하시겠습니까?', () =>
        handleAddItem(selectItem),
      );
      setSelectItem(initialItemState);
      setErrorMessage('');
    }
  };

  const onClickSaveItem = () => {
    handleModal('저장 하시겠습니까?', () => handleSaveItem(items));
  };
  const onClickDeleteItem = (item: Item) => {
    handleModal('삭제 하시겠습니까? \n 삭제시 되돌리기 불가능', () =>
      removeItem(item),
    );
  };

  const onClickItemInit = () => {
    handleModal('취소 하시겠습니까? \n 작성한 목록 초기화 됨', () =>
      handleRefreshItem(),
    );
  };

  const onClickTabelTr = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    if (selectedTarget) {
      selectedTarget.style.background = '#fff7f7';
      setInpoMessage('');
    }
    target.style.background = '#c3e9bf';
    setSelectedTarget(target);
  };
  
  const handleRefreshItem = () => {
    return refreshItems();
  };

  return (
    <div className="manager-table-box">
      <div className="manager-item-table">
        <div className="message-box">
          <p className="manager-message">{inpoMessage}</p>
        </div>
        <table className="manager-item-list">
          <tbody>
            <tr>
              <th>List</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Delete</th>
            </tr>
            {items.map(item => {
              return (
                <ItemTabelBody
                  key={item.id}
                  buttonName="삭제"
                  item={item}
                  onChangeName={e => onChangeTextInput(e, 'itemName', item)}
                  onChangePrice={e => onChangeNumberInput(e, 'price', item)}
                  onChangeStock={e => onChangeNumberInput(e, 'stock', item)}
                  onClickButton={() => onClickDeleteItem(item)}
                  onClickTabelTr={onClickTabelTr}
                />
              );
            })}
            <ItemTabelBody
              item={selectItem}
              buttonName="추가"
              onChangeName={e => onChangeAddItemTextInput(e, 'itemName')}
              onChangePrice={e => {
                onChangeAddItemNumberInput(e, 'price');
              }}
              onChangeStock={e => {
                onChangeAddItemNumberInput(e, 'stock');
              }}
              onClickButton={onClickAddItem}
              onClickTabelTr={onClickTabelTr}
            />
          </tbody>
        </table>
        <div className="message-box">
          <p className="manager-message">{errorMessage}</p>
        </div>
      </div>
      <div className="manager-btn-box">
        <button type="button" className="manager-btn" onClick={onClickItemInit}>
          취소
        </button>
        <button type="button" className="manager-btn" onClick={onClickSaveItem}>
          수정
        </button>
      </div>
    </div>
  );
};
export default ItemTable;
