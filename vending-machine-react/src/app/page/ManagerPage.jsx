import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ManagerPage() {
  const [items, setItems] = useState([]);
  const [selectItem, setSelectedItem] = useState('default');

  const getItemData = () => {
    axios.get(`http://localhost:3001/items`).then(res => {
      setItems(res.data);
    });
  };
  useEffect(() => {
    getItemData();
  }, []);

  const handleSelectChang = e => {
    setSelectedItem(e.target.value);
  };

  return (
    <form name="manage-page" id="manager-page" method="POST">
      <h2 className="manager-page-title">관리자 페이지</h2>

      <div className="manager-page-setting">
        <label htmlFor="manager-input">
          아이템
          <select
            className="manager-input"
            id="manager-input"
            value={selectItem}
            onChange={handleSelectChang}
          >
            <option disabled value="default">
              아이템 선택
            </option>
            {items.map((item, index) => {
              return (
                <option key={index} value={index}>
                  {item.itemName}
                </option>
              );
            })}
          </select>
        </label>

        <label htmlFor="stock-change">
          재고
          <input
            disabled={selectItem !== 'default' ? false : true}
            type="number"
            id="stock-change"
            className="manager-input"
            min="0"
            max="20"
            placeholder={items[selectItem] ? items[selectItem].stock : ''}
          />
          <input
            type="submit"
            id="save-stock"
            className="save-btn"
            value="저장"
          />
        </label>

        <label htmlFor="price-change">
          가격
          <input
            disabled={selectItem !== 'default' ? false : true}
            type="number"
            id="price-change"
            className="manager-input"
            min="1"
            max="2000"
            placeholder={items[selectItem] ? items[selectItem].price : ''}
          />
          <input
            type="submit"
            id="save-price"
            className="save-btn"
            value="저장"
          />
        </label>
      </div>

      <table className="manager-item-list">
        <tbody>
          <tr>
            <th>List</th>
            <th>Stock</th>
            <th>Price</th>
          </tr>
          {items.map((item, index) => {
            return (
              <tr key={index} className="item-list">
                <td className="item-list-name">{item.itemName}</td>
                <td>{item.stock}</td>
                <td>{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="manager-btn-box">
        <Link to="/" className="manager-btn home-btn">
          홈으로
        </Link>
      </div>
    </form>
  );
}
