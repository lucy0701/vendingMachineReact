import { useEffect, useState } from 'react';
import {
  readMachineCoins,
  createMachineCoin,
  saveMachineCoin,
  deleteMachineCoin,
} from '../services/machineCoin';
import { Coin } from '../types/coin';

export const useMachineCoins = () => {
  const [machineCoins, setMachineCoins] = useState<Coin[]>([]);

  const getMachineCoins = async () => {
    try {
      const response = await readMachineCoins();

      if (response) {
        setMachineCoins(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addMachineCoin = async (addMachineCoin: Coin) => {
    try {
      const response = await createMachineCoin(addMachineCoin);
      if (response) {
        return getMachineCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateMachineCoin = async (updateMachineCoin: Coin) => {
    const { coin } = updateMachineCoin;
    try {
      const response = await saveMachineCoin(coin);
      if (response) {
        return getMachineCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeMachineCoin = async (removeMachineCoin: Coin) => {
    const { coin } = removeMachineCoin;
    try {
      const response = await deleteMachineCoin(coin);
      if (response) {
        return getMachineCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMachineCoins();
  }, []);

  return {
    machineCoins,
    addMachineCoin,
    updateMachineCoin,
    removeMachineCoin,
  };
};
