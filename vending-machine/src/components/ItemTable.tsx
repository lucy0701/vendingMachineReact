import React, { useState } from 'react';
import { Item } from '../types/item';
import ItemTabelBody from './ItemTabelBody';

interface Props {
  items: Item[];
  handleSaveItem: (item: Item[]) => void;
  handleAddItem: (item: Item) => void;
  handleDeleteItem: (item: Item) => void;
  handleModal: (message: string, onClickEvent: () => void) => void;
}

const ItemTable = ({
  items,
  handleSaveItem,
  handleAddItem,
  handleDeleteItem,
  handleModal,
}: Props) => {
  const [inpoMessage, setInpoMessage] = useState('');
  const [updateItems, setUpdateItems] = useState<Item[]>([]);
  const [selectItem, setSelectItem] = useState<Item>({
    id: 0,
    itemName: '',
    price: 0,
    stock: 0,
    url: '',
  });
  const maxiMum = {
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
    (item[key] as string) = name;
    updateItems(item);
  };

  const onError = (item: Item) => {
    if (items.length >= 8) {
      return { message: '최대 8개까지 등록이 가능합니다' };
    } else if (item.itemName === null || item.price <= 0 || item.stock <= 0) {
      return { message: '작성하지 않은 칸이 있습니다' };
    } else {
      return null;
    }
  };

  const onClickAddItem = () => {
    const error = onError(selectItem);
    if (error) {
      handleModal(error.message, () => handleAddItem(selectItem));
    } else {
      handleModal('아이템을 추가 하시겠습니까?', () =>
        handleAddItem(selectItem),
      );
      setSelectItem({ id: 0, itemName: '', price: 0, stock: 0, url: '' });
    }
  };

  // const onClickAddItem = () => {
  //   if (items.length >= 8) {
  //     handleModal('최대 8개까지 등록이 가능 합니다', ()=> handleAddItem(selectItem));
  //   } else if (
  //     selectItem.itemName === null ||
  //     selectItem.price <= 0 ||
  //     selectItem.stock <= 0
  //   ) {
  //     handleModal('작성하지 않은 칸 있음', ()=> handleAddItem(selectItem));
  //   } else {
  //     handleModal('아이템을 추가 하시겠습니까?', () =>
  //       handleAddItem(selectItem),
  //     );
  //     setSelectItem({ id: 0, itemName: '', price: 0, stock: 0, url: '' });
  //   }
  // };

  const onClickSaveItem = () => {
    handleModal('저장 하시겠습니까?', () => handleSaveItem(updateItems));
  };
  const onClickDeleteItem = (item: Item) => {
    handleModal('삭제 하시겠습니까? \n 삭제시 되돌리기 불가능', () =>
      handleDeleteItem(item),
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
    <>
      <p className="manager-inpo-message">{inpoMessage}</p>
      <div className="manager-item-table">
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
              onClickButton={() => onClickAddItem()}
              onClickTabelTr={onClickTabelTr}
            />
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="manager-btn"
        onClick={() => onClickSaveItem()}
      >
        아이템 수정
      </button>
    </>
  );
};
export default ItemTable;
