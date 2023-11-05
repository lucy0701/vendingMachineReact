import React from 'react';
import { useEffect, useState } from 'react';
import axios from '../../axios/axios-config';

interface Items {
  itemName: string;
  price: number;
  stock: number;
  url: string;
}

export default function ItemTable() {
  const [items, setItems] = useState<Items[]>([]);

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
  useEffect(() => {
    getItems();
  }, []);

  return (
    <table className="manager-item-list">
      <tbody>
        <tr>
          <th>List</th>
          <th>Stock</th>
          <th>Price</th>
        </tr>
        {items.map((item,index) => {
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
  );
}
