import { useEffect, useState } from 'react';
import {
  readMyItemList,
  createMyItemList,
  updateMyItem,
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

  const saveMyItemList = async (saveMyItemList: Item) => {
    const { id } = saveMyItemList;
    try {
      const response = await updateMyItem(id,saveMyItemList);
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
      const response = await deleteMyItemList(id,removeMyItem);
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

  return { myItems, addMyItem, saveMyItemList, removeMyItem };
};
