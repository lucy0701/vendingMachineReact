import { useEffect, useState } from 'react';
import {
  readMyItemList,
  createMyItemList,
  saveMyItemList,
  deleteMyItemList,
} from '../services/myItemList';
import { Item } from '../types/item';

export const useMyItems = () => {
  const [myItems, setMyItems] = useState<Item[]>([]);

  const getMyItems = async () => {
    try {
      const response = await readMyItemList();

      if (response) {
        setMyItems(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addMyItem = async (addMyItem: Item) => {
    try {
      const response = await createMyItemList(addMyItem);
      if (response) {
        return getMyItems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateMyItem = async (updateMyItem: Item) => {
    const { id } = updateMyItem;
    try {
      const response = await saveMyItemList(id);
      if (response) {
        return getMyItems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeMyItem = async (removeMyItem: Item) => {
    const { id } = removeMyItem;
    try {
      const response = await deleteMyItemList(id);
      if (response) {
        return getMyItems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyItems();
  }, []);

  return { myItems, addMyItem, updateMyItem, removeMyItem };
};
