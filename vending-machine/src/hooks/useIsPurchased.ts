import { useEffect } from 'react';
import { readIsPurchased, updateIsPurchased } from '../services/isPurchased';
import { useRecoilState } from 'recoil';
import { isPurchasedState } from '../recoil/atoms/containerAtoms/isPurchasedState';

export const useIsPurchased = () => {
  const [isPurchased, setIsPurchased] =
    useRecoilState<boolean>(isPurchasedState);

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
