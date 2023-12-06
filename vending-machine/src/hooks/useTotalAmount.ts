import { useEffect } from 'react';
import { readTotalAmount, updateTotalAmount } from '../services/totalAmount';
import { totalAmountState } from '../recoil/atoms/containerAtoms/totalAmountState';
import { useRecoilState } from 'recoil';

export const useTotalAmount = () => {
  const [totalAmount, setTotalAmount] = useRecoilState(totalAmountState);

  const getTotalAmount = async () => {
    try {
      const response = await readTotalAmount();
      if (response) {
        setTotalAmount(response.data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveTotalAmount = async (saveTotalAmount: number) => {
    try {
      const response = await updateTotalAmount(saveTotalAmount);
      if (response) {
        return getTotalAmount();
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getTotalAmount();
  }, []);
  return { totalAmount, saveTotalAmount };
};
