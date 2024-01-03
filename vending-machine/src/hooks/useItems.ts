import { useEffect } from 'react';
import {
  readItems,
  createItem,
  updateItem,
  deleteItem,
} from '../services/item';
import { Item } from '../types/item';
import { useRecoilState } from 'recoil';
import { itemState } from '../recoil/atoms/containerAtoms/itemState';

export const useItems = () => {
  const [items, setItems] = useRecoilState<Item[]>(itemState);

  const getItems = async () => {
    try {
      const response = await readItems();
      if (response) {
        setItems(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async (addItem: Item) => {
    try {
      const response = await createItem(addItem);
      if (response) {
        return getItems();
      }
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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
