import { useEffect, useState } from 'react';
import { readTotalAmount, updateTotalAmount } from '../services/totalAmount';

export const useTotalAmount = () => {
  const [totalAmount, setTotalAmount] = useState(0);

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
