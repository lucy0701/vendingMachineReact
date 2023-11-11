import { useState } from 'react';
import { readTotalAmount, saveTotalAmount } from '../services/totalAmount';

export const useTotal = () => {
  const [totalAmount, setTotalAmount] = useState();

  const getTotalAmount = async () => {
    try {
      const response = await readTotalAmount();
      if (response) {
        setTotalAmount(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const upateTotalAmount = async (updateTotalAmount: number) => {
    try {
      const response = await saveTotalAmount(updateTotalAmount);
      if (response) {
        return getTotalAmount();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { totalAmount, upateTotalAmount };
};
