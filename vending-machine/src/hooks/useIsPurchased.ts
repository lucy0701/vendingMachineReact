import { useEffect, useState } from 'react';
import { readIsPurchased, updateIsPurchased } from '../services/isPurchased';

export const useIsPurchased = () => {
  const [isPurchased, setIsPurchased] = useState<boolean>();

  const getIsPurchased = async () => {
    try {
      const response = await readIsPurchased();
      if (response) {
        setIsPurchased(response.data.purchased);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveIsPurchased = async (saveIsPurchased: boolean) => {
    try {
      const response = await updateIsPurchased(saveIsPurchased);
      if (response) {
        return getIsPurchased();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getIsPurchased();
  }, []);
  return { isPurchased, saveIsPurchased };
};
