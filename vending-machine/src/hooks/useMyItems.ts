import { useEffect } from 'react';
import {
  readMyItems,
  createMyItem,
  updateMyItem,
  deleteMyItem,
} from '../services/myItem';
import { MyItem } from '../types/myItem';
import { useRecoilState } from 'recoil';
import { myItemState } from '../recoil/atoms/containerAtoms/myItemState';

export const useMyItems = () => {
  const [myItems, setMyItems] = useRecoilState<MyItem[]>(myItemState);

  const getMyItems = async () => {
    try {
      const response = await readMyItems();
      if (response) {
        setMyItems(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addMyItem = async (addMyItem: MyItem) => {
    try {
      const response = await createMyItem(addMyItem);
      if (response) {
        return getMyItems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveMyItem = async (saveMyItem: MyItem) => {
    const { id } = saveMyItem;
    try {
      const response = await updateMyItem(id, saveMyItem);
      if (response) {
        return getMyItems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeMyItem = async (removeMyItem: MyItem) => {
    const { id } = removeMyItem;
    try {
      const response = await deleteMyItem(id, removeMyItem);
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

  return { myItems, addMyItem, saveMyItem, removeMyItem };
};
