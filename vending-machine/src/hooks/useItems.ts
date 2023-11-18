import { useEffect, useState } from 'react';
import {
  readItems,
  createItem,
  updateItem,
  deleteItem,
} from '../services/item';
import { Item } from '../types/item';

export const useItems = () => {
  const [items, refreshItems] = useState<Item[]>([]);

  const getItems = async () => {
    try {
      const response = await readItems();
      if (response) {
        refreshItems(response.data);
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

  const saveItem = async (saveItem: Item) => {
    const { id } = saveItem;
    try {
      const response = await updateItem(id, saveItem);
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
      const response = await deleteItem(id, removeItem);
      if (response) {
        return getItems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return {
    refreshItems: getItems,
    items,
    addItem,
    saveItem,
    removeItem,
  };
};
