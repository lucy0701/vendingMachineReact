import { useEffect, useState } from 'react';
import { readItems, createItem, saveItem, deleteItem } from '../services/item';
import { Item } from '../types/item';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  const getItems = async () => {
    try {
      const response = await readItems();

      if (response) {
        setItems(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (addItem: Item) => {
    try {
      const response = await createItem(addItem);
      if (response) {
        return getItems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (updateItem: Item) => {
    const { id } = updateItem;
    try {
      const response = await saveItem(id);
      if (response) {
        return getItems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (removeItem: Item) => {
    const { id } = removeItem;
    try {
      const response = await deleteItem(id);
      if (response) {
        return getItems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const addItem = (addItem: Item) => {
  //   axios
  //   .post('/items', addItem)
  //   .then(res => {
  //     console.log('서버 응답', res.data);
  //     return getItemList();
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // };

  useEffect(() => {
    getItems();
  }, []);

  return { items, addItem, updateItem, removeItem };
};
