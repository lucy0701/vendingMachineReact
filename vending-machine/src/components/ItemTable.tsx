import React, { useState } from 'react';
import { Item } from '../types/item';
import ItemTabelBody from './ItemTabelBody';

interface Props {
  items: Item[];
  handleSaveItem: (item: Item[]) => void;
  handleAddItem: (item: Item) => void;
  handleDeleteItem: (item: Item) => void;
  handleModal: (message: string, onClickEvent: () => void) => void;
  handleRefreshItem: () => void;
}

const ItemTable = ({
  items,
  handleSaveItem,
  handleAddItem,
  handleDeleteItem,
  handleModal,
  handleRefreshItem,
}: Props) => {
  const [inpoMessage, setInpoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [updateItems, setUpdateItems] = useState<Item[]>([]);
  const [selectItem, setSelectItem] = useState<Item>({
    id: 0,
    itemName: '',
    price: 0,
    stock: 0,
    url: '',
  });
  const maxiMum = {
    itemName: 8,
    price: 10000,
    stock: 200,
  };
  const [selectedTarget, setSelectedTarget] = useState<HTMLElement | null>(
    null,
  );

  const addUpdateItems = (item: Item) => {
    setUpdateItems(prevItems => {
      const itemIndex = prevItems.findIndex(
        prevItem => prevItem.id === item.id,
      );
      if (itemIndex === -1) {
        return [...prevItems, item];
      } else {
        const newItems = [...prevItems];
        newItems[itemIndex] = item;
        return newItems;
      }
    });
  };

  const changeSelectItem = (item: Item) => {
    setSelectItem(prev => ({
      ...prev,
      item,
    }));
  };

  const onChangeNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Item,
    item: Item,
    updateItems: (item: Item) => void,
    maxiMum: number,
  ) => {
    const num = Number(e.currentTarget.value.replaceAll(',', ''));

    if (!Number.isInteger(num) || (Number.isInteger(num) && num > maxiMum)) {
      e.preventDefault();
      setInpoMessage(`${key}는 ${maxiMum} 이하로 입력해 주세요`);

      setErrorMessage('');
      return;
    }

    (item[key] as number) = num;
    updateItems(item);
  };

  const onChangeTextInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Item,
    item: Item,
    updateItems: (item: Item) => void,
  ) => {
    const name = e.currentTarget.value;
    if(name.length > maxiMum.itemName) {
      e.preventDefault();
      setInpoMessage(`이름은 ${maxiMum.itemName}자 이하로 입력해 주세요`);

      setErrorMessage('');
      return;
    }
    (item[key] as string) = name;
    setErrorMessage('');
    updateItems(item);
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
      setSelectItem({ id: 0, itemName: '', price: 0, stock: 0, url: '' });
      setErrorMessage('');
    }
  };

  const onClickSaveItem = () => {
    handleModal('저장 하시겠습니까?', () => handleSaveItem(updateItems));
  };
  const onClickDeleteItem = (item: Item) => {
    handleModal('삭제 하시겠습니까? \n 삭제시 되돌리기 불가능', () =>
      handleDeleteItem(item),
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
                  onChangeName={e =>
                    onChangeTextInput(e, 'itemName', item, addUpdateItems)
                  }
                  onChangePrice={e =>
                    onChangeNumberInput(
                      e,
                      'price',
                      item,
                      addUpdateItems,
                      maxiMum.price,
                    )
                  }
                  onChangeStock={e =>
                    onChangeNumberInput(
                      e,
                      'stock',
                      item,
                      addUpdateItems,
                      maxiMum.stock,
                    )
                  }
                  onClickButton={() => onClickDeleteItem(item)}
                  onClickTabelTr={onClickTabelTr}
                />
              );
            })}
            <ItemTabelBody
              item={selectItem}
              buttonName="추가"
              onChangeName={e =>
                onChangeTextInput(e, 'itemName', selectItem, changeSelectItem)
              }
              onChangePrice={e => {
                onChangeNumberInput(
                  e,
                  'price',
                  selectItem,
                  changeSelectItem,
                  maxiMum.price,
                );
              }}
              onChangeStock={e => {
                onChangeNumberInput(
                  e,
                  'stock',
                  selectItem,
                  changeSelectItem,
                  maxiMum.stock,
                );
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
