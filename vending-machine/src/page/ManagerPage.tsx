import ItemTable from '../components/ItemTable';
import React, { useRef, useState } from 'react';
import FormBtn from '../components/FormBtn';
import { Link } from 'react-router-dom';
import { Item } from '../types/item';
import { formatPrice } from '../utils/number';
import { useItems } from '../hooks/useItems';

// interface ManagerPageProps {
//   addItem: (selectItem:Item) => void;
//   updateItem: (updatedItem: Item) => void;
//   deleteItem: (deleteItem: Item) => void;
// }

export default function ManagerPage() {
  // TODO: 커스텀 훅 사용 익혀보기
  // TODO: 전역 상태관리 나중에 적용
  // const { items, refreshItems } = useItems();
  // const { items } = useItems();
  const { items, addItem, updateItem, removeItem } = useItems();

  const [selectItem, setSelectItem] = useState<Item>({
    id: -1,
    itemName: '',
    price: 0,
    stock: 0,
    url: '',
  });

  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState(true);
  const [isActiveTable, setIsActiveTable] = useState(true);

  // const creactItem = (selectItem: Item) => {
  //   axios
  //     .post(`/items`, selectItem)
  //     .then(res => {
  //       console.log('서버 응답', res.data);
  //       return refreshItems();
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // const saveItem = (updatedItem: Item) => {
  //   const itemId = updatedItem.id;

  //   axios
  //     .put(`/items/${itemId}`, updatedItem)
  //     .then(res => {
  //       console.log('서버 응답', res.data);
  //       return refreshItems();
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // const deleteItem = (deleteItem: Item) => {
  //   const itemId = deleteItem.id;

  //   axios
  //     .delete(`/items/${itemId}`)
  //     .then(res => {
  //       console.log('삭제 성공', res.data);
  //       return refreshItems();
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  const addSelectItem = (item: Item) => {
    setSelectItem(item);
  };

  const onClickCreactItem = () => {
    if (
      items.length < 8 &&
      selectItem.price > 0 &&
      selectItem.stock > 0 &&
      selectItem.itemName !== null
    ) {
      addItem(selectItem);
    }
  };

  const onSubmitSaveFormData = () => {
    if (selectItem.id !== -1) {
      updateItem(selectItem);
    }
  };

  const onClickDeleteItem = () => {
    removeItem(selectItem);
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const num = Number(e.target.value.replaceAll(',', ''));

    // TODO: 가격 제한폭 + 안내문구 추가
    if (!Number.isInteger(num) || (Number.isInteger(num) && num > 10000)) {
      e.preventDefault();
      return;
    }

    setSelectItem(prev => ({
      ...prev,
      [key]: formatPrice(num),
    }));
  };

  // const onChangePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputText = e.target.value.replace(/[^0-9]/g, '');
  //   const formattedNumber = inputText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //   setSelectItem(prev => ({
  //     ...prev,
  //     price: Number(formattedNumber.replace(/,/g, '')),
  //   }));
  // };

  // const handleChangeStockInput: ChangeEventHandler<HTMLInputElement> = e => {
  //   setSelectItem(prev => ({
  //     ...prev,
  //     stock: Number(e.currentTarget.value),
  //   }));
  // };

  // const handleChangePriceInput: ChangeEventHandler<HTMLInputElement> = e => {
  //   setSelectItem(prev => ({
  //     ...prev,
  //     price: Number(e.currentTarget.value),
  //   }));
  // };

  // const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
  //   setSelectItem(prev => ({
  //     ...prev,
  //     [e.currentTarget.name]: Number(e.currentTarget.value),
  //   }));
  // };

  const prevSelectItemRef = useRef<Item>(selectItem);

  const onClickOpenCreactBtn = () => {
    prevSelectItemRef.current = selectItem;
    setSelectItem({
      id: 0,
      itemName: '',
      price: 0,
      stock: 0,
      url: '',
    });
    setIsActiveBtn(true);
    setIsActiveInput(false);
    setIsActiveTable(false);
  };
  const onClickCloseBtn = () => {
    setSelectItem(prevSelectItemRef.current);
    setIsActiveBtn(false);
  };
  const onClickCloseCreactBtn = () => {
    setSelectItem(prevSelectItemRef.current);
    setIsActiveBtn(false);
    setIsActiveTable(true);
    if (prevSelectItemRef.current.id === -1) {
      setIsActiveInput(true);
    }
  };
  const onClickOpenDelelteBtn = () => {
    setIsActiveBtn(true);
  };

  return (
    <form name="manage-page" id="manager-page" method="POST">
      <h2 className="manager-page-title">관리자 페이지</h2>

      <div className="manager-page-setting">
        <label htmlFor="stock-change">
          이름
          <input
            type="text"
            id="name-change"
            placeholder="아이템 이름"
            className="manager-input manager-item-name"
            value={selectItem.itemName}
            onChange={e => {
              setSelectItem(prev => ({
                ...prev,
                itemName: e.target.value,
              }));
            }}
            disabled={isActiveInput}
          />
        </label>

        <label htmlFor="stock-change">
          재고
          <input
            type="text"
            id="stock-change"
            className="manager-input"
            value={selectItem.stock
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            onChange={e => {
              onChangeInput(e, 'stock');
            }}
            disabled={isActiveInput}
          />
        </label>

        <label htmlFor="price-change">
          가격
          <input
            type="text"
            id="price-change"
            className="manager-input"
            value={selectItem.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            onChange={e => {
              onChangeInput(e, 'price');
            }}
            disabled={isActiveInput}
          />
        </label>
        <div className="form-btn-box">
          <button
            type="button"
            id="save-btn"
            className="form-btn form-btn-01"
            onClick={() => {
              onSubmitSaveFormData();
            }}
            disabled={isActiveBtn || isActiveInput}
          >
            아이템 수정
          </button>
        </div>

        <FormBtn
          openBtnValue="아이템 추가"
          checkBtn="추가"
          onClickFormBtn={onClickCreactItem}
          onClickCloseBtn={onClickCloseCreactBtn}
          onClickOpenBtn={onClickOpenCreactBtn}
          btnActive={isActiveBtn}
        />
        <FormBtn
          openBtnValue="아이템 삭제"
          checkBtn="삭제"
          onClickOpenBtn={onClickOpenDelelteBtn}
          onClickCloseBtn={onClickCloseBtn}
          onClickFormBtn={onClickDeleteItem}
          btnActive={isActiveBtn || isActiveInput}
        />
      </div>
      <ItemTable
        items={items}
        addSelectItem={addSelectItem}
        setIsActiveInput={setIsActiveInput}
        isActiveTable={isActiveTable}
      />
      <div className="manager-btn-box">
        <Link to="/" className="manager-btn manager-home-btn">
          Home
        </Link>
      </div>
    </form>
  );
}
