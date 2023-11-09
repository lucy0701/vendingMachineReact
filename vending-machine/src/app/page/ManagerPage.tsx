import ItemTable from '../components/ItemTable';
import axios from '../../axios/axios-config';
import React, { useRef, useEffect, useState } from 'react';
import FormBtn from '../components/FormBtn';
import { Link } from 'react-router-dom';

interface Items {
  id: number;
  itemName: string;
  price: number;
  stock: number;
  url: string;
}
interface SelectItem {
  id: number;
  itemName: string;
  price: number;
  stock: number;
  url: string;
}

export default function ManagerPage() {
  const [items, setItems] = useState<Items[]>([]);

  const [selectItem, setSelectItem] = useState<SelectItem>({
    id: -1,
    itemName: '아이템 이름',
    price: 0,
    stock: 0,
    url: '',
  });

  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState(true);
  const [isActiveTable, setIsActiveTable] = useState(true);

  const getItems = () => {
    axios
      .get('/items')
      .then(res => {
        setItems(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const creactItem = (selectItem: Items) => {
    axios
      .post(`/items`, selectItem)
      .then(res => {
        console.log('서버 응답', res.data);
        return getItems();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const saveItem = (updatedItem: Items) => {
    const itemId = updatedItem.id;

    axios
      .put(`/items/${itemId}`, updatedItem)
      .then(res => {
        console.log('서버 응답', res.data);
        return getItems();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteItem = (deleteItem: Items) => {
    const itemId = deleteItem.id;

    axios
      .delete(`/items/${itemId}`)
      .then(res => {
        console.log('삭제 성공', res.data);
        return getItems();
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  const addSelectItem = (item: Items) => {
    setSelectItem(item);
  };

  const onClickCreactItem = () => {
    if (
      items.length < 8 &&
      selectItem.price > 0 &&
      selectItem.stock > 0 &&
      selectItem.itemName !== null
    ) {
      creactItem(selectItem);
    }
  };

  const onSubmitSaveFormData = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectItem.id !== -1) {
      saveItem(selectItem);
    }
  };

  const onClickDeleteItem = () => {
    deleteItem(selectItem);
  };

  const onChangeStockInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value.replace(/[^0-9]/g, '');
    const formattedNumber = inputText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setSelectItem(prev => ({
      ...prev,
      stock: Number(formattedNumber.replace(/,/g, '')),
    }));
  };

  const onChangePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value.replace(/[^0-9]/g, '');
    const formattedNumber = inputText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setSelectItem(prev => ({
      ...prev,
      price: Number(formattedNumber.replace(/,/g, '')),
    }));
  };

  const prevSelectItemRef = useRef<SelectItem>(selectItem);

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
    <form
      name="manage-page"
      id="manager-page"
      method="POST"
      onSubmit={e => {
        onSubmitSaveFormData(e);
      }}
    >
      <h2 className="manager-page-title">관리자 페이지</h2>

      <div className="manager-page-setting">
        <label htmlFor="stock-change">
          이름
          <input
            type="text"
            id="name-change"
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
              onChangeStockInput(e);
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
              onChangePriceInput(e);
            }}
            disabled={isActiveInput}
          />
        </label>

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
        <input
          type="submit"
          id="save-btn"
          className="manager-btn"
          value="저장"
        />
      </div>
    </form>
  );
}
